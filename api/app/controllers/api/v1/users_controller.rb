class Api::V1::RecordsController < ApplicationController
  before_action :authenticate_user!

  def update
    user = User.find(params[:id])
    if user.update(cycle: params[:cycle])
      render json: { id: user.id, username: user.username, cycle: user.cycle }
    else
      render json: { error: 'Failed to update cycle' }, status: :unprocessable_entity
    end
  end
end
