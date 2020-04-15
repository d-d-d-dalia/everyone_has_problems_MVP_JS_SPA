class Api::V1::ProblemsController < ApplicationController

    def index
        @problems = Problem.all
        render json: @problems
    end

    def create
        @problem = Problem.create(problem_params)
        render json: @problem
    end

    def destroy
        @problem = Problem.find_by(id: params[:id]).destroy
        render json: @problem
    end

private

    def problem_params
        params.require(:problem).permit(:name, :description, :user_id)
    end

end
