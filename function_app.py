import os
import azure.functions as func
import logging
import json
from azure.cosmos import CosmosClient, exceptions

# Initialize Cosmos client using environment variables
cosmos_url = os.getenv("CosmosDB_URL")
cosmos_key = os.getenv("CosmosDB_Key")
database_name = os.getenv("CosmosDB_Database")
container_name = os.getenv("CosmosDB_Container")

# Ensure environment variables are loaded
if not all([cosmos_url, cosmos_key, database_name, container_name]):
    logging.error("One or more Cosmos DB environment variables are missing")
    raise Exception("Cosmos DB environment variables not set")

try:
    cosmos_client = CosmosClient(cosmos_url, credential=cosmos_key)
    database = cosmos_client.get_database_client(database_name)
    container = database.get_container_client(container_name)
except exceptions.CosmosResourceNotFoundError as e:
    logging.error(f"Error connecting to Cosmos DB: {e}")
    raise e

# Define the Azure Function
app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="resumeapi")
def resumeapi(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing HTTP trigger for resumeapi.')

    try:
        # Retrieve the 'id' and 'section' from the query parameters
        item_id = req.params.get('id')
        section = req.params.get('section')  # New query parameter for sections

        if not item_id:
            return func.HttpResponse(
                "Please pass an 'id' in the query string",
                status_code=400
            )

        # Retrieve the item from Cosmos DB using the item ID and partition key
        item_response = container.read_item(item=item_id, partition_key=item_id)
        logging.info(f"Item fetched from Cosmos DB: {item_response}")

        # Sections to choose from in the document
        available_sections = ['basics', 'work', 'volunteer', 'education', 'awards', 'certificates', 'publications', 'skills', 'languages', 'interests', 'references', 'projects']

        # If section is provided, get the corresponding section from the item
        if section:
            if section in available_sections:
                selected_section = item_response.get(section, {})
                if not selected_section:
                    return func.HttpResponse(f"Section '{section}' is empty or does not exist in the document.", status_code=404)
                return func.HttpResponse(json.dumps(selected_section, indent=2), status_code=200, mimetype="application/json")
            else:
                return func.HttpResponse(f"Invalid section. Available sections: {', '.join(available_sections)}", status_code=400)
        
        # If no section is specified, return the entire document
        return func.HttpResponse(json.dumps(item_response, indent=2), status_code=200, mimetype="application/json")

    except exceptions.CosmosResourceNotFoundError as e:
        logging.error(f"Item not found in Cosmos DB: {e}")
        return func.HttpResponse(
            f"Item with ID '{item_id}' not found in Cosmos DB",
            status_code=404
        )
    except exceptions.CosmosHttpResponseError as e:
        logging.error(f"Error reading item from Cosmos DB: {e.message}")
        return func.HttpResponse(
            "Error reading item from Cosmos DB",
            status_code=500
        )
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return func.HttpResponse(
            "An unexpected error occurred",
            status_code=500
        )
