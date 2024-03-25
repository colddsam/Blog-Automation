import requests

graphql_endpoint = "https://gql.hashnode.com/"

headers = {
    'Content-Type': 'application/json',
    'Authorization': '325768d0-75b4-45e1-be2c-c60043311de6'
}

mutation_query = '''
mutation PublishPost($input: PublishPostInput!) {
  publishPost(input: $input) {
    post {
      id
      slug
      title
      subtitle
    }
  }
}
'''

mutation_variables = {
    "input": {
        "title": "abcdefcgh",
        "subtitle": "abcdefgh",
        "contentMarkdown": "abcdefgh",
        "coverImageOptions": {
            "coverImageURL": "https://2.img-dpreview.com/files/p/E~C33x0S928x522T1200x675~articles/7395606096/Google-Photos_1.jpeg",
            "isCoverAttributionHidden": False,
            "coverImageAttribution": "abc123",
            "coverImagePhotographer": "xyz789"
        },
        "slug": "xyz789",
        "tags": [{
            "name": "JavaScript",
            "slug": "javascript",
            "id": "56744721958ef13879b94cad"
        }],
        "disableComments": False,
        "publicationId": "65102296cee41f4569292580"
    }
}

# Make the GraphQL request
response = requests.post(graphql_endpoint, headers=headers, json={
                         'query': mutation_query, 'variables': mutation_variables})

# Check if request was successful and print response
if response.status_code == 200:
    print(response.json())
else:
    print("GraphQL request failed with status code:", response)
