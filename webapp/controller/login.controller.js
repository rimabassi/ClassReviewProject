sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, MessageBox, Fragment, JSONModel, MessageToast) {
	"use strict";
	return Controller.extend("BUStudentDirectory.controller.Login", {

		//-------------------------------------------------
		//-- OnInit
		//-------------------------------------------------
		OnInit: function() {

			// attach handlers for validation errors
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("buidField"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("passwordField"), true);
		},
		//-------------------------------------------------
		//-- OnBuidChange
		//-------------------------------------------------
		OnBuidChange: function(oEvent) {
			var oInput = oEvent.getSource();
			var buid = this.getView().byId("buidField").getValue();
			oInput.setValueState("None");
			if (buid.length !== 10) {
				oInput.setValueState("Error");
			}
			if (buid.length > 10) {
				oInput.setValueState("Error");
			}
		},
		//----------------------------------------------
		//-- OnPasswordChange
		//----------------------------------------------
		OnPasswordChange: function(oEvent) {
			var oInput = oEvent.getSource();
			var password = this.getView().byId("passwordField").getValue();
			if (password.length <= 6 || password.length > 20) {
				oInput.setValueState("Error");
			} else {
				oInput.setValueState("None");
			}
		},
		//----------------------------------------
		//-- OnLogIn
		//----------------------------------------
		OnLogIn: function(oEvent) {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			// GET BUID and password values 
			var that = this;
			var oView = this.getView();
			var aInputs = [
				oView.byId("buidField"),
				oView.byId("passwordField")
			];
			var bValidationError = false;
			// check that inputs are not empty
			jQuery.each(aInputs, function(i, oInput) {
				bValidationError = that._validateInput(oInput) || bValidationError;
			});

			// If BU ID and password are provided, then check the Database table PersonLogin
			if (!bValidationError) {

				var buid = this.getView().byId("buidField").getValue();
				var password = this.getView().byId("passwordField").getValue();

				// Read Odata with the BU ID and password
				// Service URL
				var sServiceUrl = "/MaterialDB/Mat/";
				// Create the Model for the service
				var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);

				// Read the new Object into the EntitySet
				oModel.read("/PersonLogin", {
					method: "GET",
					success: function(oData, Response) {

						that.getView().setModel(oModel);
						var sSelectedItem = that.getView().byId("buidField").getValue();

						var record_dont_exist = true;

				
						$.each(oData.results, function(i, d) {
							if (oData.results[i].buid === buid && oData.results[i].password === password) {
								record_dont_exist = false;
								var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
								oRouter.navTo("masterview", {
									SelectedItem: sSelectedItem
								});

							}
						});

						if (record_dont_exist === true) {
							MessageBox.error("Account does not exist. Please create an account", {
								styleClass: bCompact ? "sapUiSizeCompact" : ""
							});
							// clear the BU id and password values
							that.getView().byId("buidField").setValue("");
							that.getView().byId("passwordField").setValue("");
						}

					},
					error: function() {
						MessageBox.error("Account does not exist. Please create an account", {
							styleClass: bCompact ? "sapUiSizeCompact" : ""
						});
						// clear the BU id and password values
						that.getView().byId("buidField").setValue("");
						that.getView().byId("passwordField").setValue("");
					}
				});

			} //(!bValidationError)
			else // display error message
			{
				MessageBox.alert("A validation error has occured. Complete your input first");
			}

		},
		//-------------------------------------		
		// OnCreateNewAccount
		//------------------------------------------
		OnCreateNewAccount: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("newuser");
			} //--------------------------------------------------------------------------------------	
			,
		//----------------------------------------
		//-- OnBuidLiveChange
		//----------------------------------------
		OnBuidLiveChange: function(oEvent) {
			var oInput = oEvent.getSource();
			var buid = this.getView().byId("buidField").getValue();
			oInput.setValueState("None");
			if (buid.length !== 10) {
				oInput.setValueState("Error");
			}
			if (buid.length > 10) {
				oInput.setValueState("Error");
			}
		},

		//------------------------------------------------
		// Methods
		//-------------------------------------------------
		_validateInput: function(oInput) {
			var buid = this.getView().byId("buidField").getValue();
			var password = this.getView().byId("passwordField").getValue();
			var sValueState = "None";
			var bValidationError = false;
			if (!buid) {
				sValueState = "Error";
				bValidationError = true;
			}
			if (!password) {
				sValueState = "Error";
				bValidationError = true;
			}
			oInput.setValueState(sValueState);
			return bValidationError;
		}
	});
});
