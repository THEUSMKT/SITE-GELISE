#!/usr/bin/env python3
"""Build a dependency-free GitHub Pages artifact; never ship original uploads."""
import argparse
import html
import json
import shutil
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / '.site-build'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site-url', default='', help='Confirmed/configured Pages URL for canonical and Open Graph metadata')
    args = parser.parse_args()
    site_url = args.site_url.rstrip('/')
    if site_url and (urlparse(site_url).scheme != 'https' or not urlparse(site_url).netloc):
        parser.error('--site-url must be an HTTPS URL')
    if DESTINATION.exists():
        shutil.rmtree(DESTINATION)
    DESTINATION.mkdir()
    for name in ('index.html', 'favicon.png', '.nojekyll'):
        shutil.copy2(ROOT / name, DESTINATION / name)
    for name in ('css', 'js'):
        shutil.copytree(ROOT / name, DESTINATION / name)
    # Everything in assets/ except the untouched original uploads.
    shutil.copytree(ROOT / 'assets', DESTINATION / 'assets', ignore=shutil.ignore_patterns('originals'))
    if site_url:
        document = (DESTINATION / 'index.html').read_text()
        safe_url = html.escape(site_url + '/', quote=True)
        metadata = f'<link rel="canonical" href="{safe_url}">'
        if 'property="og:url"' not in document:
            metadata += f'\n  <meta property="og:url" content="{safe_url}">'
        document = document.replace(
            '<!-- Deployment metadata is inserted by scripts/build.py when a Pages URL is available. -->',
            metadata,
        )
        document = document.replace('content="assets/og-image.jpg"', f'content="{html.escape(site_url, quote=True)}/assets/og-image.jpg"')
        # Use JSON serialization rather than interpolating a URL into structured data.
        start = document.index('<script type="application/ld+json">') + len('<script type="application/ld+json">')
        end = document.index('</script>', start)
        data = json.loads(document[start:end])
        data['url'] = site_url + '/'
        if not urlparse(data.get('image', '')).scheme:
            data['image'] = f"{site_url}/{data['image']}"
        document = document[:start] + '\n    ' + json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + '\n  ' + document[end:]
        (DESTINATION / 'index.html').write_text(document)
    files = [path for path in DESTINATION.rglob('*') if path.is_file()]
    print(f'GitHub Pages artifact: {DESTINATION} ({len(files)} files, {sum(p.stat().st_size for p in files):,} bytes)')


if __name__ == '__main__':
    main()
