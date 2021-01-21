class EventsController < ApplicationController
  def index
    @owner = params[:owner]
    @repo = params[:repo]
    unless @owner.nil? || @repo.nil?
      octokit = Octokit::Client.new(auto_paginate: true)
      octokit.access_token = current_user.token if current_user
      @events = octokit.repository_events("#{@owner}/#{@repo}").map(&:to_h)
    end

    respond_to do |format|
      format.html
      format.json do
        render json: @events
      end
    end
  end
end
