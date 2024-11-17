class Api::V1::RecordsController < ApplicationController
  before_action :set_record, only: [:show, :update, :destroy]

  def index
    @records = Record.all
    render json: @records
  end

  # GET /api/v1/records/:id
  def show
    render json: @record
  end

  # def create
  #   record = Record.new(record_params)
  #   Rails.logger.info "Before Save: #{record.inspect}" # 保存前のログ
  
  #   if record.save
  #     Rails.logger.info "After Save: #{record.inspect}" # 保存後のログ
  #     render json: { message: 'Record created successfully', record: record }, status: :created
  #   else
  #     render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  def create_or_update
    # レコードの存在確認
    record = Record.find_by(user_id: record_params[:user_id], record_date: record_params[:record_date])

    if record
      # レコードが存在する場合は更新
      if record.update(record_params)
        render json: { message: 'Record updated successfully', record: record }, status: :ok
      else
        render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
      end
    else
      # レコードが存在しない場合は新規作成
      new_record = Record.new(record_params)
      if new_record.save
        render json: { message: 'Record created successfully', record: new_record }, status: :created
      else
        render json: { errors: new_record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def show_by_date
    @record = Record.find_by(record_date: params[:record_date], user_id: params[:user_id])

    if @record
      render json: @record
    else
      render json: { error: "Record not found" }, status: :not_found
    end
  end
  
  private

  def set_record
    if params[:record_date].present? && params[:user_id].present?
      @record = Record.find_by!(record_date: params[:record_date], user_id: params[:user_id])
    else
      render json: { error: "Record date or user ID is missing" }, status: :unprocessable_entity
    end  end

    def record_params
      params.require(:record).permit(:user_id, :record_date, :temperature, :weight, :note, :is_period_start, :is_period_end, :is_discharge, :is_spotting, :is_taking_pill)
    end
end