class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
  end

  def cities
  	if(params[:region_id])
  		respond = Region.find(params[:region_id]).cities
  	else
  		respond = City.all
  	end
		respond_to do |format|
	    format.json { render json: respond}
	  end
  end
end
