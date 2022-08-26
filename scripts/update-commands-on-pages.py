import os
import sys
import re



def fix_page(filename, page_text):
    # get everything after 'const markdown = `# ➟ ' in that line
    pattern = re.compile('const markdown = `# ➟ (.*)\n')
    try:
        old_endpoint = pattern.search(page_text).groups()[0]
        endpoint = re.sub(r"/:([a-z]*)", r"/{\1}", old_endpoint) # fix :miner to {miner}
    except AttributeError:
        return # page already fixed (?)

    if endpoint == '` + endpoint + `':
        return # page already fixed

    # set this as endpoint var 'const endpoint = my-endpoint;
    # replace 'const markdown' for
    # const endpoint = my-endpoint;
    # const markdown...
    replace_str = f"const endpoint = '{endpoint}';" + '\n' + "const markdown"
    page_text = re.sub('const markdown', replace_str, page_text)

    # replace everything after 'const markdown = `# ➟ ' in that line by ` + endpoint +
    page_text = re.sub('const markdown = `# ➟ (.*)\n', f'const markdown = `# ➟ ` + endpoint + `\n', page_text)


    curl_filename = './code-snippets/'+endpoint.replace('/', '').split('?')[0]+'/curl.txt'
    js_filename = './code-snippets/'+endpoint.replace('/', '').split('?')[0]+'/js.txt'

    # set curl to contents of curl_filename
    try:
        with open(curl_filename, 'r') as curl_file:
            curl_str = curl_file.read().strip()
        page_text = re.sub('const curl = `(.*)`', f"const curl = `{curl_str}`", page_text)
    except FileNotFoundError:
        print(f'could not find {curl_filename}, skipping')

    # if XMLHttpRequest is in the file, replace this part in code: 'url+"` + endpoint + `"'
    pattern = re.compile('XMLHttpRequest')
    if pattern.search(page_text):
        page_text = re.sub('url\+(.*)\n', 'url+"` + endpoint + `"\n', page_text)
    else:
    # if XMLHttpRequest is not in the file, set code to contents of js_filename
        try:
            with open(js_filename, 'r') as js_file:
                js_str = js_file.read().strip()
            page_text = re.sub('const code = `(.*)}`;', f"const code = `{js_str}`;", page_text, flags=re.S)
        except FileNotFoundError:
            print(f'could not find {js_filename}, skipping')

    return page_text


for filename in os.listdir('./pages'):
    if not filename.endswith(".tsx"):
        continue

    # open page file
    with open('./pages/'+filename, 'r') as page:
        fixed_page = fix_page(filename, page.read())

    if fixed_page == None:
        continue

    if len(sys.argv) == 2 and sys.argv[1] == "print":
        print(fixed_page)
    else:
        # write and truncate to new file
        with open('./pages/'+filename, 'w+') as page:
            page.write(fixed_page)
