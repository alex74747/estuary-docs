import os
import sys
import re
from textwrap import dedent


def get_endpoint(page_text):
    # get everything after 'const markdown = `# ➟ ' in that line
    pattern = re.compile('const markdown = `# ➟ (.*)\n')
    endpoint = ""
    try:
        old_endpoint = pattern.search(page_text).groups()[0]
        # fix :miner to {miner}
        endpoint = re.sub(r"/:([a-z]*)", r"/{\1}", old_endpoint)
    except AttributeError:
        pass

    # endpoint is in new format, get it from the 'const endpoint' line
    if endpoint != '` + endpoint + `':
        return endpoint, False

    pattern = re.compile("const endpoint = '(.*)';\n")
    try:
        endpoint = pattern.search(page_text).groups()[0]
    except AttributeError:
        print('error: could not find either endpoint')
        return ""

    return endpoint, True


def get_method(page_text):
    # get everything after 'const markdown = `# ➟ ' in that line
    pattern = re.compile('// %method:(.*)%')
    method = ""
    try:
        method = pattern.search(page_text).groups()[0]
    except AttributeError:
        pass

    return method


def fix_endpoint(endpoint, page_text):
    # set this as endpoint var 'const endpoint = my-endpoint;
    # replace 'const markdown' for
    # const endpoint = my-endpoint;
    # const markdown...
    replace_str = f"const endpoint = '{endpoint}';" + '\n' + "const markdown"
    page_text = re.sub('const markdown', replace_str, page_text)

    # replace everything after 'const markdown = `# ➟ ' in that line by ` + endpoint +
    page_text = re.sub('const markdown = `# ➟ (.*)\n', f'const markdown = `# ➟ ` + endpoint + `\n', page_text)
    return page_text


def fix_curl(endpoint, method, page_text):
    curl_filename = './code-snippets/'+endpoint.replace('/', '').split('?')[0]+method+'/curl.txt'
    # set curl to contents of curl_filename
    try:
        with open(curl_filename, 'r') as curl_file:
            curl_str = curl_file.read().strip()
        page_text = re.sub('const curl = `(.*)`', f"const curl = `{curl_str}`", page_text)
    except FileNotFoundError:
        print(f'could not find {curl_filename}, skipping')
    return page_text


def fix_js(endpoint, method, page_text):
    js_filename = './code-snippets/'+endpoint.replace('/', '').split('?')[0]+method+'/js.txt'

    # if XMLHttpRequest is in the file, replace this part in code: 'url+"` + endpoint + `"'
    pattern = re.compile('XMLHttpRequest')
    if pattern.search(page_text):
        page_text = re.sub('url\+(.*)\n', 'url+"` + endpoint + `"\n', page_text)
    else:
    # if XMLHttpRequest is not in the file, set code to contents of js_filename
        try:
            with open(js_filename, 'r') as js_file:
                js_str = dedent(js_file.read().strip())
            page_text = re.sub('const code = `(.*)}`;', f"const code = `{js_str}`;", page_text, flags=re.S)
        except FileNotFoundError:
            print(f'could not find {js_filename}, skipping')

    return page_text


if __name__ == '__main__':
    for filename in os.listdir('./pages'):
        if not filename.endswith(".tsx"):
            continue

        # open page file
        with open('./pages/'+filename, 'r') as page:
            page_text = page.read()
            endpoint, is_new_format = get_endpoint(page_text)
            if endpoint == '':
                print(f'Skipping {filename}, wrong format')
                continue
            method = get_method(page_text)
            if method == '':
                print(f'Skipping {filename}, wrong method')
                continue

            print(f'endpoint: {endpoint}; is_new_format: {is_new_format}')
            if not is_new_format:
                page_text = fix_endpoint(endpoint, page_text)
            page_text = fix_curl(endpoint, method, page_text)
            page_text = fix_js(endpoint, method, page_text)

        if len(sys.argv) == 2 and sys.argv[1] == "print":
            print(page_text)
        else:
            # write and truncate to new file
            with open('./pages/'+filename, 'w+') as page:
                page.write(page_text)
