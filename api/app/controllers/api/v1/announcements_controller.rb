class Api::V1::AnnouncementsController < ApplicationController
  def index
    users_with_discrepancy = User.check_cycle_discrepancy
    if users_with_discrepancy.any?
      render json: { message: "生理周期に乱れがあるようです。婦人系疾患に関する情報をご提供するので、参考にしていただき、必要であれば専門機関の受診を推奨します。" }, status: :ok
    else
      render json: { message: nil }, status: :ok
    end
  end
end