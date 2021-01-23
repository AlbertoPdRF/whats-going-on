class EventsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        owner = params[:owner]
        repo = params[:repo]
        unless owner.nil? || repo.nil?
          octokit = Octokit::Client.new(auto_paginate: true)
          repository = Repository.new(owner: owner, repo: repo, url: "https://github.com/#{owner}/#{repo}")
          if current_user
            octokit.access_token = current_user.token
            repository.user_id = current_user.id
            saved_repository = current_user.repositories.find{ |r| r[:user_id] == repository.user_id && r[:url] == repository.url }
            repository = saved_repository if saved_repository
          end
          events = octokit.repository_events("#{owner}/#{repo}").map(&:to_h)
        end

        render status: :ok, json: { repository: repository, events: events }
      end
    end
  end
end
