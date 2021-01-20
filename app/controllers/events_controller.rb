class EventsController < ApplicationController
  def index
    @owner = params[:owner]
    @repo = params[:repo]
    unless @owner.nil? || @repo.nil?
      @events = Octokit::Client.new(auto_paginate: true).repository_events("#{@owner}/#{@repo}").map(&:to_h)
    end

    respond_to do |format|
      format.html
      format.json do
        render json: @events
      end
    end
  end
end
