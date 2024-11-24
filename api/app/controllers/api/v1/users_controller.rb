class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    user = User.find(params[:id])
    if user.update(cycle: params[:cycle])
      render json: {
        id: current_user.id,
        username: current_user.username,
        cycle: current_user.cycle
      }
    else
      render json: { error: 'Failed to update cycle' }, status: :unprocessable_entity
    end
  end

  def show_current
    Rails.logger.debug "Current user: #{current_user.inspect}"
    render json: current_user
  end
end
