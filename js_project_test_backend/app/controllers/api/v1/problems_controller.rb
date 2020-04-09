class Api::V1::ProblemsController < ApplicationController

    def index
        @problems = Problem.all
        render json: @problems
    end

    def create
        @problem = Problem.create(params)
        render json: @problem
    end

private

    def problem_params
        params.permit(:title, :description)
    end

end
