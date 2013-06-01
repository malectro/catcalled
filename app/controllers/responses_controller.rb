class ResponsesController < ApplicationController

  def index
    @responses = Response.reviewed
  end

  def new
    @response = Response.new

    respond_to do |format|
      format.html
      format.json { render :json => @response }
    end
  end

  def create
    @response = Response.new(params[:response])

    respond_to do |format|
      if @response.save
        format.html { redirect_to thanks_path }
        format.json { render json: @response, status: :created, location: @response }
      else
        format.html { render action: 'new' }
        format.json { render json: @response.errors, status: :failed }
      end
    end
  end

  def thanks

  end

end
