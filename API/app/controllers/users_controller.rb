class UsersController < ApplicationController
    def login
        user = User.find_by(email: user_params[:email])
        if user && user.authenticate(user_params[:password])
            render json: { jwt: user.jwt }
        else
            render json: { errors: ["Invalid email or password"] }, status: :unauthorized
        end
    end
    
    def create
        user = User.new(user_params)
        user.save!
        render json: { jwt: user.jwt }, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :conflict
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end