# Resume API with Azure Functions & Cosmos DB

This project provides an API using Azure Functions to retrieve resume data from Cosmos DB.

## Features

- Fetch specific resume sections (e.g., `basics`, `work`, `education`) or the entire resume.

- Error handling for missing IDs or invalid sections.

## Prerequisites

- **Azure Subscription** for Cosmos DB and Functions.

- **Python 3.8+** and **Azure Functions Core Tools**.

## Setup

1\. **Clone the repository**:

```bash

git clone https://github.com/pyprajwal/az-cloudresume-api

cd az-cloudresume-api

```

2\. **Create a virtual environment**:

```bash

python -m venv .venv

source .venv/bin/activate  # Windows: .venv\Scripts\activate

```

3\. **Install dependencies**:

```bash

pip install -r requirements.txt

```

4\. **Create a `local.settings.json`** with Cosmos DB details:

```json
{
  "Values": {
    "CosmosDB_URL": "<your-cosmos-db-url>",

    "CosmosDB_Key": "<your-cosmos-db-key>",

    "CosmosDB_Database": "<your-db-name>",

    "CosmosDB_Container": "<your-container-name>"
  }
}
```

5\. **Run locally**:

```bash

func start

```

## Usage

- **Fetch specific section**:

`id=93bd0aec-5a87-43e6-9ae0-c6d67477614d`

`section-name = ['basics', 'work', 'volunteer', 'education', 'awards', 'certificates', 'publications', 'skills', 'languages', 'interests', 'references', 'projects']`

`GET http://localhost:7071/api/resumeapi?id=<resume-id>&section=<section-name>`

- **Fetch entire resume**:

`GET http://localhost:7071/api/resumeapi?id=<resume-id>`
