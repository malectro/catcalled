class HomeController < ApplicationController
  def index
    @about = About.first
  end

  def about
    @about = About.first
  end
end
