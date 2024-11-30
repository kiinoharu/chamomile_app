class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  # ログイン中のユーザー情報を取得
  def me
    if current_user
      render json: { id: current_user.id, username: current_user.username, cycle: current_user.cycle }
    else
      render json: { error: "Not authenticated" }, status: :unauthorized
    end
  end
  
  # ユーザー情報を取得する
  def show
    user = User.find(params[:id])
    render json: { username: user.username, cycle: user.cycle }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  # ユーザー情報（周期）を更新する
  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: { message: "User updated successfully", user: { username: user.username, cycle: user.cycle } }
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :cycle)
  end
end
