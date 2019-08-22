sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Text"
], function(Controller, MessageToast, MessageBox, Button, Dialog, Text) {
	"use strict";
	return Controller.extend("BUStudentDirectory.controller.NewUser", {
		//-------------------------------------------------
		//-- onInit
		//-------------------------------------------------
		onInit: function() {

			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			// attach handlers for validation errors
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("buidID"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("passwordID"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("schoolID"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("firstnameID"), true);
			sap.ui.getCore().getMessageManager().registerObject(this.oView.byId("lastnameID"), true);

			// set the json model to the view
			var oJsonModel = new sap.ui.model.json.JSONModel();
			oJsonModel.loadData("data/data.json");
			oJsonModel.attachRequestCompleted(function(oEventModel) {});
			// Update the view with the new JsonModel
			var oView = this.getView();
			oView.setModel(oJsonModel);

			// initiate all the fields

		},
		//-------------------------------------------------
		//-- OnBuidChange
		//-------------------------------------------------
		OnBuidChange: function(oEvent) {
			var oInput = oEvent.getSource();
			var buid = this.getView().byId("buidID").getValue();
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
			var password = this.getView().byId("passwordID").getValue();
			if (password.length <= 6 || password.length > 20) {
				oInput.setValueState("Error");
			} else {
				oInput.setValueState("None");
			}
		},
		//----------------------------------------
		//-- OnBuidLiveChange
		//----------------------------------------
		OnBuidLiveChange: function(oEvent) {
			var oInput = oEvent.getSource();
			var buid = this.getView().byId("buidID").getValue();
			oInput.setValueState("None");
			if (buid.length !== 10) {
				oInput.setValueState("Error");
			}
			if (buid.length > 10) {
				oInput.setValueState("Error");
			}
		},
		//----------------------------------------
		//-- OnCreateNewAccount
		//----------------------------------------
		onCreateNewAccount: function(oEvent) {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			// GET BUID and password and school values
			var that = this;
			var oView = that.getView();
			var aInputs = [
				oView.byId("buidID"),
				oView.byId("passwordID"),
				oView.byId("schoolID"),
				oView.byId("firstnameID"),
				oView.byId("lastnameID")
			];
			var bValidationError = false;
			// check that inputs are not empty
			jQuery.each(aInputs, function(i, oInput) {
				bValidationError = that._validateInput(oInput) || bValidationError;
			});

			if (!bValidationError) { // create the person

				// Get the form values

				var buid = this.getView().byId("buidID").getValue();
				var password = this.getView().byId("passwordID").getValue();
				var firstname = this.getView().byId("firstnameID").getValue();
				var lastname = this.getView().byId("lastnameID").getValue();
				var school = this.getView().byId("schoolID").getValue();
				var degree = this.getView().byId("degreeID").getValue();
				var program = this.getView().byId("programID").getValue();
				var semester1 = this.getView().byId("semester1ID").getValue();
				var s1year = this.getView().byId("s1yearID").getValue();
				var s1gpa = this.getView().byId("s1gpaID").getValue();
				var s1class1 = this.getView().byId("s1class1ID").getValue();
				var s1class2 = this.getView().byId("s1class2ID").getValue();
				var s1class3 = this.getView().byId("s1class3ID").getValue();
				var s1class4 = this.getView().byId("s1class4ID").getValue();
				var semester2 = this.getView().byId("semester2ID").getValue();
				var s2year = this.getView().byId("s2yearID").getValue();
				var s2gpa = this.getView().byId("s2gpaID").getValue();
				var s2class1 = this.getView().byId("s2class1ID").getValue();
				var s2class2 = this.getView().byId("s2class2ID").getValue();
				var s2class3 = this.getView().byId("s2class3ID").getValue();
				var s2class4 = this.getView().byId("s2class4ID").getValue();
				var semester3 = this.getView().byId("semester3ID").getValue();
				var s3year = this.getView().byId("s3yearID").getValue();
				var s3gpa = this.getView().byId("s3gpaID").getValue();
				var s3class1 = this.getView().byId("s3class1ID").getValue();
				var s3class2 = this.getView().byId("s3class2ID").getValue();
				var s3class3 = this.getView().byId("s3class3ID").getValue();
				var s3class4 = this.getView().byId("s3class4ID").getValue();
				var semester4 = this.getView().byId("semester4ID").getValue();
				var s4year = this.getView().byId("s4yearID").getValue();
				var s4gpa = this.getView().byId("s4gpaID").getValue();
				var s4class1 = this.getView().byId("s4class1ID").getValue();
				var s4class2 = this.getView().byId("s4class2ID").getValue();
				var s4class3 = this.getView().byId("s4class3ID").getValue();
				var s4class4 = this.getView().byId("s4class4ID").getValue();
				var email = this.getView().byId("emailID").getValue();
				var phonenumber = this.getView().byId("phonenumberID").getValue();
				var mobilenumber = this.getView().byId("mobilenumberID").getValue();
				var skypeaccount = this.getView().byId("skypeaccountID").getValue();
				var slackaccount = this.getView().byId("slackaccountID").getValue();

				//var persontype = this.getView().byId("persontypeID").getSelectedButton();
				if (this.getView().byId("RB1-1").getSelected()) {
					var persontype = "01";
				}
				if (this.getView().byId("RB1-2").getSelected()) {
					persontype = "02";
				}
				if (this.getView().byId("RB1-3").getSelected()) {
					persontype = "03";
				}

				// Read Odata with the BU ID and password

				// Create a new Object with the new data 
				var oPerson = {};
				oPerson = {
					"buid": buid,
					"password": password,
					"persontype": persontype,
					"firstname": firstname,
					"lastname": lastname,
					"school": school,
					"degree": degree,
					"program": program,
					"semester1": semester1,
					"s1year": s1year,
					"s1gpa": s1gpa,
					"s1class1": s1class1,
					"s1c1review": "",
					"s1class2": s1class2,
					"s1c2review": "",
					"s1class3": s1class3,
					"s1c3review": "",
					"s1class4": s1class4,
					"s1c4review": "",
					"semester2": semester2,
					"s2year": s2year,
					"s2gpa": s2gpa,
					"s2class1": s2class1,
					"s2c1review": "",
					"s2class2": s2class2,
					"s2c2review": "",
					"s2class3": s2class3,
					"s2c3review": "",
					"s2class4": s2class4,
					"s2c4review": "",
					"semester3": semester3,
					"s3year": s3year,
					"s3gpa": s3gpa,
					"s3class1": s3class1,
					"s3c1review": "",
					"s3class2": s3class2,
					"s3c2review": "",
					"s3class3": s3class3,
					"s3c3review": "",
					"s3class4": s3class4,
					"s3c4review": "",
					"semester4": semester4,
					"s4year": s4year,
					"s4gpa": s4gpa,
					"s4class1": s4class1,
					"s4c1review": "",
					"s4class2": s4class2,
					"s4c2review": "",
					"s4class3": s4class3,
					"s4c3review": "",
					"s4class4": s4class4,
					"s4c4review": "",
					"email": email,
					"phonenumber": phonenumber,
					"mobilenumber": mobilenumber,
					"skypeaccount": skypeaccount,
					"slackaccount": slackaccount
				};

				oPerson.toString();

				//-- Insert Person Table
				// Service URL
				var sServiceUrl = "/MaterialDB/Mat/";
				// Create the Model for the service
				var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				// Add the new Object into the EntitySet
				oModel.create("/Person", oPerson);

				// Update PersonLogin table
				var oPersonLogin = {};
				oPersonLogin = {
					"buid": buid,
					"password": password
				};
				// Add the new Object into the EntitySet
				var oPersonLoginModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oPersonLoginModel.create("/PersonLogin", oPersonLogin);

				// display message => account created
				// call Dialog popup

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("login");
				MessageBox.success(
					"Account created successfully. Please login to your account", {
						styleClass: bCompact ? "sapUiSizeCompact" : ""
					}
				);

			} else // display error message
			{
				//Page scroll to top
				var oPage = that.getView().byId("page");
				oPage.scrollTo(0, 0);

			}
		},
		//----------------------------------------
		//-- OnCancelCreateNewAccount
		//----------------------------------------
		OnCancelCreateNewAccount: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		//----------------------------------------
		//-- OnSelectPersonType
		//----------------------------------------
		OnSelectPersontype: function(oEvent) {

		},
		//------------------------------------------------
		// Methods
		//-------------------------------------------------
		_validateInput: function(oInput) {

			var buid = this.getView().byId("buidID").getValue();
			var password = this.getView().byId("passwordID").getValue();
			var school = this.getView().byId("schoolID").getValue();
			var firstname = this.getView().byId("firstnameID").getValue();
			var lastname = this.getView().byId("lastnameID").getValue();

			var sValueState = "None";
			var bValidationError = false;

			// buid validation
			if (!buid) {
				sValueState = "Error";
				bValidationError = true;
			}
			// password
			if (!password) {
				sValueState = "Error";
				bValidationError = true;
			}

			// school
			if (!school) {
				sValueState = "Error";
				bValidationError = true;
			}

			// first name
			if (!firstname) {
				sValueState = "Error";
				bValidationError = true;
			}

			// lastname
			if (!lastname) {
				sValueState = "Error";
				bValidationError = true;
			}
			oInput.setValueState(sValueState);
			return bValidationError;
		}

	});
});