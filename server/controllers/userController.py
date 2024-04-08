from schemas.user import User
from database.supabase import create_supabase_client
import bcrypt
from fastapi import HTTPException, Response
from fastapi.responses import JSONResponse

supabase = create_supabase_client()

def register(user: User):
    try:
        user_email = user.email.lower()

        #check if email exists
        user_exists = supabase.table('user').select("*").eq('email', user_email).execute()

        if user_exists.data:
            return JSONResponse(status_code=400, content={"message": "Email đã tồn tại"})

        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        user_data = {
            "email": user_email,
            "password": hashed_password,
            "username": user.user_name,
            "role": user.role.value,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone_num": user.phone_num
        }

        user = supabase.table('user').insert(user_data).execute()
        
        if user:
            
            return {
                "message": "Đăng ký thành công",
                "data": user
            }
        else:
            raise HTTPException(status_code=400, detail="Có lỗi xảy ra trong quá trình đăng ký")
        
    except Exception as e:
        print("Error creating user: ", e)
        return JSONResponse(status_code=500, content={"message": "Có lỗi xảy ra trong quá trình đăng ký"})
