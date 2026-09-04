import json, os, sys, argparse, urllib.request, urllib.parse, html

# Vietnamese strings as unicode escapes to keep source pure-ASCII (encoding-proof)
EMOJI       = "\U0001f48c"            # \U0001f48c
THIEP       = "Thi\u1ec7p M\u1eddi C\u01b0\u1edbi"
COUPLE      = "B\u1ea3o Tr\u00e2n & Minh Tr\u00ed"
TRANTRONG   = "Tr\u00e2n tr\u1ecdng k\u00ednh m\u1eddi"
DUTHONLE    = "tham d\u1ef1 h\u00f4n l\u1ec5"
BTN_TEXT    = "N\u1ebfu ch\u01b0a t\u1ef1 chuy\u1ec3n, b\u1ea5m \u0111\u1ec3 m\u1edf thi\u1ec7p."
TIP         = "\u27a1\ufe0f Xem thi\u1ec7p m\u1eddi c\u01b0\u1edbi"

DEFAULT_SHEET_URL = ("https://script.google.com/macros/s/AKfycbywtZ8HCUijM2UGcBcd8taY7P"
                     "nBfrFMWr4UzMFh49goZQ7AAfKTsLbO3zhKdqxL3F_AyQ/exec")
DEFAULT_DOMAIN = "https://btranmtri-wedding.cloud"


def fetch_guests(sheet_url):
    url = sheet_url + "?action=guests"
    with urllib.request.urlopen(url, timeout=40) as r:
        return json.loads(r.read().decode("utf-8"))


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and isinstance(data.get("guests"), list):
        return data["guests"]
    return data


def esc(s):
    return html.escape(str(s), quote=True)


def valid_slug(s):
    return bool(s) and all(ch.isalnum() or ch in "-" for ch in s) and "/" not in s and s not in (".", "..")


def tokens_for(g):
    side = (g.get("side") or "groom").lower()
    tok = ""
    if side == "bride":
        tok += ".b"
    if g.get("showBankQr") is False:
        tok += ".x"
    return tok


def render_page(domain, slug, name, tokens):
    og_title = f"{EMOJI}{THIEP} \u2014 {name}"
    og_desc  = f"{TRANTRONG} {name} {DUTHONLE} {COUPLE}."
    page_url = f"{domain}/guest/{slug}.html"
    img_url  = f"{domain}/og-preview/mau1-final.jpg?v=2"
    redir    = f"../wedding.html?to={urllib.parse.quote(slug + tokens, safe='')}&n={urllib.parse.quote(name)}"
    redir_abs= f"{domain}/wedding.html?to={urllib.parse.quote(slug + tokens, safe='')}&n={urllib.parse.quote(name)}"
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(og_title)}</title>
<!-- OPEN GRAPH - static per-guest so Messenger/Facebook show the guest name -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(THIEP + " " + COUPLE)}">
<meta property="og:title" content="{esc(og_title)}">
<meta property="og:description" content="{esc(og_desc)}">
<meta property="og:image" content="{img_url}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="{page_url}">
<meta property="og:locale" content="vi_VN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(og_title)}">
<meta name="twitter:description" content="{esc(og_desc)}">
<meta name="twitter:image" content="{img_url}">
<meta http-equiv="refresh" content="0; url={redir}">
<script>location.replace("{redir}");</script>
<style>
  body{{margin:0;font-family:Georgia,serif;background:#f7e6c4;color:#3e2b1f;height:100vh;display:flex;align-items:center;justify-content:center}}
  .card{{text-align:center;padding:32px;max-width:560px;width:92%}}
  h1{{font-size:1.7rem;margin:0 0 8px;font-weight:600}}
  p{{font-size:1rem;color:#6b4f37}}
  a{{display:inline-block;margin-top:18px;background:#b62b2b;color:#fff;text-decoration:none;padding:12px 26px;border-radius:999px;font-size:1rem}}
</style>
</head>
<body>
<div class="card">
  <h1>{esc(og_title)}</h1>
  <p>{esc(og_desc)}</p>
  <a href="{redir_abs}">{TIP}</a>
</div>
</body>
</html>\n"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sheet", default=DEFAULT_SHEET_URL)
    ap.add_argument("--json")
    ap.add_argument("--domain", default=DEFAULT_DOMAIN)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    if args.json:
        guests = load_json(args.json)
    else:
        guests = fetch_guests(args.sheet)

    if not isinstance(guests, list):
        sys.exit("\u2731 Kh\u00f4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c danh s\u00e1ch kh\u00e1ch.")

    out_dir = args.out or os.path.join(os.path.dirname(os.path.abspath(__file__)), "guest")
    os.makedirs(out_dir, exist_ok=True)

    written = skipped = 0
    for g in guests:
        name = (g.get("name") or "").strip()
        slug = (g.get("slug") or "").strip()
        if not name:
            continue
        if not valid_slug(slug):
            # fallback: build slug from name (same as guests.js slugify)
            slug = "".join(ch for ch in name.lower() if ch.isalnum() or ch == "-").replace(" ", "-")
            slug = "-".join(slug.split("-")).strip("-") or "guest"
        tokens = tokens_for(g)
        page = render_page(args.domain.rstrip("/"), slug, name, tokens)
        path = os.path.join(out_dir, slug + ".html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(page)
        written += 1
        print(f"  + {slug}.html  ({name})")
    print(f"\nSong: {written}; bo qua: {skipped}. Thu muc: {out_dir}")


if __name__ == "__main__":
    main()