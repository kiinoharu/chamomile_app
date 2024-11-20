class Api::V1::AnnouncementsController < ApplicationController
  def index
    users_with_discrepancy = User.check_cycle_discrepancy
    if users_with_discrepancy.any?
      render json: { discrepancy: true }, status: :ok
    else
      render json: { discrepancy: false }, status: :ok
    end
  end
end