sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("BUStudentDirectory.controller.MasterView", {

		//------------------------------
		// onInit
		//-----------------------------
		onInit: function() {

			var that = this;
			this._oListFilterState = {
				aFilter: [],
				aSearch: []
			};

			// Get the Router Info
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Validate/Match the Router Details 
			oRouter.getRoute("masterview").attachMatched(this._onRouteFound, this);

			// set the json model to the view
			var oJsonModel = new sap.ui.model.json.JSONModel();
			oJsonModel.loadData("data/data.json");
			oJsonModel.attachRequestCompleted(function(oEventModel) {});
			// Update the view with the new JsonModel
			var oView = this.getView();
			oView.setModel(oJsonModel);

			//set Class Reviews OData
			var sServiceUrl = "/MaterialDB/Mat";
			var oModelPos = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oModelPos.read("/ClassReview", {
				method: "GET",
				success: function(data, results) {

					var oTemplate = that.getView().byId("classReviewRow").clone();

					var oReviewModel = new sap.ui.model.json.JSONModel();
					oReviewModel.setData({
						ClassReview: data.results
					});
					var oReviewList = that.getView().byId("classreviewList");
					oReviewList.setModel(oReviewModel, "ReviewModel");

					oReviewList.bindAggregation("items", {
						path: "ReviewModel>/ClassReview",
						template: oTemplate
					});

				},
				error: function() {}
			});

			// students
			var sServiceUrl = "/MaterialDB/Mat";
			var oModelPos = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oModelPos.read("/Person", {
				method: "GET",
				success: function(data, results) {

					var oTemplate = that.getView().byId("StudentRow").clone();

					var oStudentsModel = new sap.ui.model.json.JSONModel();
					oStudentsModel.setData({
						Person: data.results
					});
					var oStudentsList = that.getView().byId("StudentsList");
					oStudentsList.setModel(oStudentsModel, "StudentsModel");

					oStudentsList.bindAggregation("items", {
						path: "StudentsModel>/Person",
						template: oTemplate
					});

				},
				error: function() {}
			});

		},

		//--------------------------------
		// Custom Method to bind the elements using the Event Arguments
		//--------------------------------
		_onRouteFound: function(oEvt) {

			var that = this;

			var oArgument = oEvt.getParameter("arguments");

			var sServiceUrl = "/MaterialDB/Mat";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oModel.read("/Person", {
				method: "GET",
				success: function(oData, Response) {

					$.each(oData.results, function(i, d) {
						if (oData.results[i].buid === oArgument.SelectedItem) {

							// Set the screen fields  -- Header
							that.getView().byId("buidheaderID").setProperty("text", d.buid);
							that.getView().byId("nameheaderID").setProperty("text", d.firstname + " " + d.lastname);
							that.getView().byId("schoolheaderID").setProperty("text", d.school);
							that.getView().byId("programheaderID").setProperty("text", d.degree + " " + d.program);

							// Set the screen fields  -- Update Profile

							that.getView().byId("passwordID").setValue(d.password);
							that.getView().byId("firstnameID").setValue(d.firstname);
							that.getView().byId("lastnameID").setValue(d.lastname);
							that.getView().byId("schoolID").setValue(d.school);
							that.getView().byId("degreeID").setValue(d.degree);
							that.getView().byId("programID").setValue(d.program);
							that.getView().byId("semester1ID").setValue(d.semester1);
							that.getView().byId("s1yearID").setValue(d.s1year);
							that.getView().byId("s1gpaID").setValue(d.s1gpa);
							that.getView().byId("s1class1ID").setValue(d.s1class1);
							that.getView().byId("s1class2ID").setValue(d.s1class2);
							that.getView().byId("s1class3ID").setValue(d.s1class3);
							that.getView().byId("s1class4ID").setValue(d.s1class4);
							that.getView().byId("semester2ID").setValue(d.semester2);
							that.getView().byId("s2yearID").setValue(d.s2year);
							that.getView().byId("s2gpaID").setValue(d.s2gpa);
							that.getView().byId("s2class1ID").setValue(d.s2class1);
							that.getView().byId("s2class2ID").setValue(d.s2class2);
							that.getView().byId("s2class3ID").setValue(d.s2class3);
							that.getView().byId("s2class4ID").setValue(d.s2class4);
							that.getView().byId("semester3ID").setValue(d.semester3);
							that.getView().byId("s3yearID").setValue(d.s3year);
							that.getView().byId("s3gpaID").setValue(d.s3gpa);
							that.getView().byId("s3class1ID").setValue(d.s3class1);
							that.getView().byId("s3class2ID").setValue(d.s3class2);
							that.getView().byId("s3class3ID").setValue(d.s3class3);
							that.getView().byId("s3class4ID").setValue(d.s3class4);
							that.getView().byId("semester4ID").setValue(d.semester4);
							that.getView().byId("s4yearID").setValue(d.s4year);
							that.getView().byId("s4gpaID").setValue(d.s4gpa);
							that.getView().byId("s4class1ID").setValue(d.s4class1);
							that.getView().byId("s4class2ID").setValue(d.s4class2);
							that.getView().byId("s4class3ID").setValue(d.s4class3);
							that.getView().byId("s4class4ID").setValue(d.s4class4);
							that.getView().byId("emailID").setValue(d.email);
							that.getView().byId("phonenumberID").setValue(d.phonenumber);
							that.getView().byId("mobilenumberID").setValue(d.mobilenumber);
							that.getView().byId("skypeaccountID").setValue(d.skypeaccount);
							that.getView().byId("slackaccountID").setValue(d.slackaccount);

							// REview Tab values
							// semester 1
							that.getView().byId("tab2s1c1reviewID").setProperty("placeholder", "Add Review about " + d.s1class1);
							that.getView().byId("tab2s1c2reviewID").setProperty("placeholder", "Add Review about " + d.s1class2);
							that.getView().byId("tab2s1c3reviewID").setProperty("placeholder", "Add Review about " + d.s1class3);
							that.getView().byId("tab2s1c4reviewID").setProperty("placeholder", "Add Review about " + d.s1class4);

							that.getView().byId("s1c1textID").setProperty("text", d.s1class1);
							that.getView().byId("s1c2textID").setProperty("text", d.s1class2);
							that.getView().byId("s1c3textID").setProperty("text", d.s1class3);
							that.getView().byId("s1c4textID").setProperty("text", d.s1class4);

							that.getView().byId("tab2s1c1reviewID").setValue(d.s1c1review);
							that.getView().byId("tab2s1c2reviewID").setValue(d.s1c2review);
							that.getView().byId("tab2s1c3reviewID").setValue(d.s1c3review);
							that.getView().byId("tab2s1c4reviewID").setValue(d.s1c4review);

							// semester 2
							that.getView().byId("tab2s2c1reviewID").setProperty("placeholder", "Add Review about " + d.s2class1);
							that.getView().byId("tab2s2c2reviewID").setProperty("placeholder", "Add Review about " + d.s2class2);
							that.getView().byId("tab2s2c3reviewID").setProperty("placeholder", "Add Review about " + d.s2class3);
							that.getView().byId("tab2s2c4reviewID").setProperty("placeholder", "Add Review about " + d.s2class4);

							that.getView().byId("s2c1textID").setProperty("text", d.s2class1);
							that.getView().byId("s2c2textID").setProperty("text", d.s2class2);
							that.getView().byId("s2c3textID").setProperty("text", d.s2class3);
							that.getView().byId("s2c4textID").setProperty("text", d.s2class4);

							that.getView().byId("tab2s2c1reviewID").setValue(d.s2c1review);
							that.getView().byId("tab2s2c2reviewID").setValue(d.s2c2review);
							that.getView().byId("tab2s2c3reviewID").setValue(d.s2c3review);
							that.getView().byId("tab2s2c4reviewID").setValue(d.s2c4review);
							// semester 3
							that.getView().byId("tab2s3c1reviewID").setProperty("placeholder", "Add Review about " + d.s3class1);
							that.getView().byId("tab2s3c2reviewID").setProperty("placeholder", "Add Review about " + d.s3class2);
							that.getView().byId("tab2s3c3reviewID").setProperty("placeholder", "Add Review about " + d.s3class3);
							that.getView().byId("tab2s3c4reviewID").setProperty("placeholder", "Add Review about " + d.s3class4);

							that.getView().byId("s3c1textID").setProperty("text", d.s3class1);
							that.getView().byId("s3c2textID").setProperty("text", d.s3class2);
							that.getView().byId("s3c3textID").setProperty("text", d.s3class3);
							that.getView().byId("s3c4textID").setProperty("text", d.s3class4);

							that.getView().byId("tab2s3c1reviewID").setValue(d.s3c1review);
							that.getView().byId("tab2s3c2reviewID").setValue(d.s3c2review);
							that.getView().byId("tab2s3c3reviewID").setValue(d.s3c3review);
							that.getView().byId("tab2s3c4reviewID").setValue(d.s3c4review);
							// semester 4
							that.getView().byId("tab2s4c1reviewID").setProperty("placeholder", "Add Review about " + d.s4class1);
							that.getView().byId("tab2s4c2reviewID").setProperty("placeholder", "Add Review about " + d.s4class2);
							that.getView().byId("tab2s4c3reviewID").setProperty("placeholder", "Add Review about " + d.s4class3);
							that.getView().byId("tab2s4c4reviewID").setProperty("placeholder", "Add Review about " + d.s4class4);

							that.getView().byId("s4c1textID").setProperty("text", d.s4class1);
							that.getView().byId("s4c2textID").setProperty("text", d.s4class2);
							that.getView().byId("s4c3textID").setProperty("text", d.s4class3);
							that.getView().byId("s4c4textID").setProperty("text", d.s4class4);

							that.getView().byId("tab2s4c1reviewID").setValue(d.s4c1review);
							that.getView().byId("tab2s4c2reviewID").setValue(d.s4c2review);
							that.getView().byId("tab2s4c3reviewID").setValue(d.s4c3review);
							that.getView().byId("tab2s4c4reviewID").setValue(d.s4c4review);

						}
					});
				},
				error: function() {}
			});

		},

		//-------------------------------------
		// onUpdateAccount
		//-------------------------------------
		onUpdateAccount: function(oEvent) {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			// get all the Update Profile fields
			var buid = this.getView().byId("buidheaderID").getProperty("text");
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

			// Update oData
			// Update Person Table
			var oPerson = {};
			oPerson = {
				"buid": buid,
				"password": password,
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

			//oPerson.toString();

			var sPath = "/Person('" + buid + "')";
			var sServiceUrl = "/MaterialDB/Mat/";
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oModel.update(sPath, oPerson);

			// Update PersonLogin table
			var oPersonLogin = {};
			oPersonLogin = {
				"buid": buid,
				"password": password
			};

			// update password -- to work on it
			//oPersonLogin.toString();

			var sPathLogin = "/PersonLogin('" + buid + "')";
			sServiceUrl = "/MaterialDB/Mat/";
			oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oModel.update(sPathLogin, oPersonLogin);

			// display message
			MessageBox.success(
				"Account Updated successfully", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);

		},

		//------------------------------------
		// onUpdateReviews
		//------------------------------------
		onUpdateReviews: function(oEvent) {

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			// read reviews input values
			var buid = this.getView().byId("buidheaderID").getProperty("text");
			var s1c1review = this.getView().byId("tab2s1c1reviewID").getValue();
			var s1c2review = this.getView().byId("tab2s1c2reviewID").getValue();
			var s1c3review = this.getView().byId("tab2s1c3reviewID").getValue();
			var s1c4review = this.getView().byId("tab2s1c4reviewID").getValue();

			var s2c1review = this.getView().byId("tab2s2c1reviewID").getValue();
			var s2c2review = this.getView().byId("tab2s2c2reviewID").getValue();
			var s2c3review = this.getView().byId("tab2s2c3reviewID").getValue();
			var s2c4review = this.getView().byId("tab2s2c4reviewID").getValue();

			var s3c1review = this.getView().byId("tab2s3c1reviewID").getValue();
			var s3c2review = this.getView().byId("tab2s3c2reviewID").getValue();
			var s3c3review = this.getView().byId("tab2s3c3reviewID").getValue();
			var s3c4review = this.getView().byId("tab2s3c4reviewID").getValue();

			var s4c1review = this.getView().byId("tab2s4c1reviewID").getValue();
			var s4c2review = this.getView().byId("tab2s4c2reviewID").getValue();
			var s4c3review = this.getView().byId("tab2s4c3reviewID").getValue();
			var s4c4review = this.getView().byId("tab2s4c4reviewID").getValue();

			// create object 

			var oReviews = {};
			oReviews = {
				"buid": buid,
				"s1c1review": s1c1review,
				"s1c2review": s1c2review,
				"s1c3review": s1c3review,
				"s1c4review": s1c4review,
				"s2c1review": s2c1review,
				"s2c2review": s2c2review,
				"s2c3review": s2c3review,
				"s2c4review": s2c4review,
				"s3c1review": s3c1review,
				"s3c2review": s3c2review,
				"s3c3review": s3c3review,
				"s3c4review": s3c4review,
				"s4c1review": s4c1review,
				"s4c2review": s4c2review,
				"s4c3review": s4c3review,
				"s4c4review": s4c4review
			};

			var sPath = "/Person('" + buid + "')";
			var sServiceUrl = "/MaterialDB/Mat/";
			var oPersonReviewModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
			oPersonReviewModel.update(sPath, oReviews);

			// display message
			MessageBox.success(
				"Class Reviews Added/Updated successfully", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);

		},

		//--------------------------------
		// onReviewSearch
		//--------------------------------
		onSearchReview: function(oEvent) {

			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				this._oListFilterState.aSearch = [new Filter("classname", FilterOperator.Contains, sQuery)];
				var aFilters = this._oListFilterState.aSearch.concat(this._oListFilterState.aFilter);
			} else {
				aFilters = [];
			}
			var oList = this.getView().byId("classreviewList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters);

		},

		//------------------------------
		// onStudentSearch
		//------------------------------
		onStudentSearch: function(oEvent) {

			var sQuery = oEvent.getParameter("query");

			var oList = this.getView().byId("StudentsList");
			var oBinding = oList.getBinding("items");
			if (!sQuery) {
				oBinding.filter([]);
			} else {
				oBinding.filter([new sap.ui.model.Filter([
					new sap.ui.model.Filter("firstname", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("lastname", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("school", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("degree", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("program", sap.ui.model.FilterOperator.Contains, sQuery)
				], false)]);

			}

		},

		//------------- search 		

		//----------------------------------------
		//onSelectTab
		//----------------------------------------
		onSelectTab: function(oEvent) {
			var that = this;
			// Get the selected tab
			var sSelectedKey = oEvent.getSource().getProperty("selectedKey");
			if (sSelectedKey === "SearchReview") {
				//set Class Reviews OData
				var sServiceUrl = "/MaterialDB/Mat";
				var oModelPos = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelPos.read("/ClassReview", {
					method: "GET",
					success: function(data, results) {

						var oTemplate = that.getView().byId("classReviewRow").clone();

						var oReviewModel = new sap.ui.model.json.JSONModel();
						oReviewModel.setData({
							ClassReview: data.results
						});
						var oReviewList = that.getView().byId("classreviewList");
						oReviewList.setModel(oReviewModel, "ReviewModel");

						oReviewList.bindAggregation("items", {
							path: "ReviewModel>/ClassReview",
							template: oTemplate
						});

					},
					error: function() {}
				});

				this.getView().byId("classreviewList").getBinding("items").refresh();
			}

			if (sSelectedKey === "SearchStudent") {

			}
		},

		//---------------------------------------
		//Update reviews
		//----------------------------------------
		onUpdates1c1Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s1c1reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s1class1ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview1 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview1.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates1c2Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s1c2reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s1class2ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview2 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview2.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates1c3Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s1c3reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s1class3ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview3 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview3.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates1c4Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s1c4reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s1class4ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview4 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview4.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates2c1Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s2c1reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s2class1ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview5 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview5.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates2c2Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s2c2reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s2class2ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview6 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview6.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates2c3Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s2c3reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s2class3ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview7 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview7.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates2c4Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s2c4reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s2class4ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview8 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview8.create(sPathReview, oReviewObject);
			} // end if	

		},

		////3
		onUpdates3c1Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s3c1reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s3class1ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview9 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview9.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates3c2Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s3c2reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s3class2ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview10 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview10.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates3c3Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s3c3reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s3class3ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview11 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview11.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates3c4Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s3c4reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s3class4ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview12 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview12.create(sPathReview, oReviewObject);
			} // end if	

		},

		//4

		onUpdates4c1Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s4c1reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s4class1ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview13 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview13.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates4c2Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s4c2reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s4class2ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview14 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview14.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates4c3Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s4c3reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s4class3ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview15 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview15.create(sPathReview, oReviewObject);
			} // end if	

		},
		onUpdates4c4Review: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;

			var sServiceUrl = "/MaterialDB/Mat/";
			var sPathReview = "/ClassReview";

			// read review input value
			var sReview = this.getView().byId("tab2s4c4reviewID").getValue();

			//1. Get The number of items in the review List 
			var oReviewNumbers = this.getView().byId("classreviewList").getItems().length;
			var sClassid = oReviewNumbers;
			var oReviewObject = {};
			// class1			
			if (sReview) {
				var sclass = this.getView().byId("s4class4ID").getValue();
				sClassid = sClassid + 1;
				var classid = sClassid.toString();
				oReviewObject = {
					classid: classid,
					classname: sclass,
					classreview: sReview
				};
				oReviewObject.toString();
				var oModelReview16 = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, true);
				oModelReview16.create(sPathReview, oReviewObject);
			} // end if	

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf BUStudentDirectory.view.MasterView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf BUStudentDirectory.view.MasterView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf BUStudentDirectory.view.MasterView
		 */
		//	onExit: function() {
		//
		//	}

	});

});