import sqlite3

DB_NAME = "./ez-clipboard-dev.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS textos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text_content TEXT NOT NUll
    )    
    """)
    conn.commit()
    conn.close()    
