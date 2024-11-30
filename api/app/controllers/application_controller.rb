class ApplicationController < ActionController::Base
  before_action :authenticate_user! # Devise による認証を有効化
  before_action :configure_permitted_parameters, if: :devise_controller?

  # HTMLではなくJSON形式でエラーレスポンスを返す
  rescue_from Devise::MissingWarden do
    render json: { error: "You must log in to access this resource" }, status: :unauthorized
  end

  protect_from_forgery with: :null_session, if: -> { request.format.json? }
  
  protected

  # Deviseストロングパラメータ設定
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :cycle])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
  end
end
