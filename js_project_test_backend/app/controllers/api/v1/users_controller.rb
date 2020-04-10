class Api::V1::UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
    end

    def create
        if User.find_by(:name => user_params[:name])
            @user = User.find_by(:name => user_params[:name])
            redirect_to "/api/v1/users/#{@user.id}"
        else
            @user = User.create(user_params)
            render json: @user  
        end
    end

    def show
        @user = User.find_by(:id => params[:id].to_i)
        render json: @user
    end

private

    def user_params
        params.require(:user).permit(:name)
    end

end