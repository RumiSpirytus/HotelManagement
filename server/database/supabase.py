from supabase import Client, create_client
from dotenv import load_dotenv

load_dotenv()

from os import environ

SUPABASE_URL = environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = environ.get("SUPABASE_ANON_KEY")

def create_supabase_client():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        return supabase
    except Exception as e:
        print("Error creating supabase client: ", e)
        return None