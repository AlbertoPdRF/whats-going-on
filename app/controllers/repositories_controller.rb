class RepositoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @repositories = current_user.repositories
  end

  def create
    @repository = Repository.new(repository_params)
    if @repository.save
      render status: :ok, json: @repository
    else
      errors = @repository.errors.full_messages
      render status: :unprocessable_entity, json: errors
    end
  end

  def destroy
    @repository = repository_from_params
    @repository.destroy
    render status: :ok, json: @repository
  end

  private

  def repository_params
    params.require(:repository).permit(:user_id, :owner, :repo, :url)
  end

  def repository_from_params
    Repository.find(params[:id])
  end
end
