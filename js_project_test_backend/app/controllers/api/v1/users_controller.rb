class Api::V1::UsersController < ApplicationController

#    before_action :set_user, only: [:show, :create]

    def index
        users = User.all
        render json: users
    end

    def create
        #binding.pry
        if User.find_by(:name => user_params[:name])
            user = User.find_by(:name => user_params[:name])
            redirect_to "/api/v1/users/#{user.id}"
        else
            user = User.create(user_params)
            render json: user
        end
    end

    def show
        user = User.find_by(:id => params[:id].to_i)
        render json: user
    end

private

    def user_params
        params.require(:user).permit(:name)
    end

    # def set_user
    #     @user = User.find_by(:id => params[:id].to_i)
    # end

end