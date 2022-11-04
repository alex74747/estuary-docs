"""
This script generates the curl commands that are included on the API endpoint
pages. It should be run every time there's an API change.
It relies on swagger docs, so those need to be correctly annotated and updated.
"""

import json
import urllib.request
from urllib.parse import urlencode
from pathlib import Path

BASE_API_URL = 'https://api.estuary.tech'
SWAGGER_FILE_URL = "https://raw.githubusercontent.com/application-research/estuary/master/docs/swagger.json"

def get_query_params_str(data):
    if 'parameters' not in data:
        return ""

    query_params = {}
    for param in data['parameters']:
        if param['in'] == 'query':
            query_params[param['name']] = param['name'].upper()

    query_str = urlencode(query_params)
    if query_str != "":
        query_str = '?' + query_str
    return query_str


def get_body_params_str(data):
    if 'parameters' not in data:
        return ""
    body_str = "-d '{"
    body_param_count = 0

    for param in data['parameters']:
        if param['in'] == 'body':
            body_param_count += 1
            if body_param_count > 1:
                body_str += ", "
            param_name = param['name']
            body_str += f'"{param_name}": "{param_name.upper()}"'

    body_str += "}'"
    if body_param_count == 0:
        return ""

    return body_str


def get_formdata_params_str(data):
    if 'parameters' not in data:
        return ""
    formdata_str = '-H "Content-Type: multipart/form-data" -F "'
    formdata_param_count = 0

    for param in data['parameters']:
        if param['in'] == 'formData':
            formdata_param_count += 1
            if formdata_param_count > 1:
                formdata_str += ", "
            param_name = param['name']
            formdata_str += f'{param_name}={param_name.upper()}'

    formdata_str += '"'
    if formdata_param_count == 0:
        return ""

    return formdata_str


if __name__ == '__main__':
    json_data = json.loads(urllib.request.urlopen(SWAGGER_FILE_URL).read())
    endpoints = json_data['paths'].keys()
    endpoints_and_methods = []
    for endpoint in endpoints:
        methods = json_data['paths'][endpoint].keys()
        for method in methods:
            endpoints_and_methods.append((endpoint, method))
            print((endpoint, method))

    for (endpoint, method) in endpoints_and_methods:
        # create endpoint dir if it does not exist
        Path('code-snippets/'+endpoint.replace('/', '')+method).mkdir(exist_ok=True, parents=True)

        # get parameters from swagger docs
        data = json_data['paths'][endpoint][method]
        query_parameters_string = get_query_params_str(data)
        body_parameters_string = get_body_params_str(data)
        formdata_parameters_string = get_formdata_params_str(data)

        # write string out to file
        curl_string = f'curl -X {method.upper()} {BASE_API_URL}{endpoint}{query_parameters_string} -H "Authorization: Bearer REPLACE_ME_WITH_API_KEY" -H "Accept: application/json" {body_parameters_string} {formdata_parameters_string}'
        with open('code-snippets/'+endpoint.replace('/', '')+method+'/curl.txt', 'w+') as txt_file:
            txt_file.write(curl_string)
