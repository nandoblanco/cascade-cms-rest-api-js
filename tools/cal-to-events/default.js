var filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8, filter9, filter10;
var includes = "";

function updatePages(year) {
	listSubscribers({
		type: "contenttype",
		id: newEventsCT,
	})
		.then(function (result) {
			console.log(result);
			result.apiReturn.subscribers.forEach(function (sub) {
				if (sub.path.path.includes(year + "/") && sub.type == "page") {
					readAsset({
						type: "page",
						id: sub.id,
					})
						.then(function (result) {
							console.log(result);
							filterConfig();

							filterMap(result.apiReturn.asset.page);
							filterCheck();

							defaultMappings(result.apiReturn.asset.page);
							editAsset({
								asset: result.apiReturn,
							})
								.then(function (result) {
									console.log(result);
								})
								.catch(function (error) {
									console.log(error);
								});
						})
						.catch(function (error) {
							console.log(error);
						});
				}
			});
		})
		.catch(function (error) {
			console.log(error);
		});
}

function deleteOldIndexFiles(test) {
	listSubscribers({
		type: "contenttype",
		id: oldEventsIndexCT,
	})
		.then(function (result) {
			console.log(result);
			result.apiReturn.subscribers.forEach(function (sub) {
				if (sub.path.siteName == newSite && sub.type == "page") {
					if (test) {
						console.log(sub);
					} else {
						deleteAsset({
							type: "page",
							id: sub.id,
						})
							.then(function (result) {
								console.log(result);
							})
							.catch(function (error) {
								console.log(error);
							});
					}
				}
			});
		})
		.catch(function (error) {
			console.log(error);
		});
}

function defaultMappings(page) {
	// Description
	var summary = page.metadata.summary;
	var description = page.metadata.metaDescription;
	if ((description == "undefined" || description == "" || description == null) && summary != "undefined" && summary != "" && summary != null) {
		page.metadata.metaDescription = summary;
	}

	// All Day
	if (page.structuredData.structuredDataNodes[16].text == "::CONTENT-XML-CHECKBOX::Yes") {
		page.structuredData.structuredDataNodes[1].text = "Yes";
		// Start Date
		page.structuredData.structuredDataNodes[4].text = moment.unix(page.structuredData.structuredDataNodes[14].text / 1000).format("MM-DD-YYYY");
		// End Date
		page.structuredData.structuredDataNodes[5].text = moment.unix(page.structuredData.structuredDataNodes[15].text / 1000).format("MM-DD-YYYY");
	} else {
		// Start Date Time
		page.structuredData.structuredDataNodes[2].text = page.structuredData.structuredDataNodes[14].text;
		// End Date Time
		page.structuredData.structuredDataNodes[3].text = page.structuredData.structuredDataNodes[15].text;
	}

	// Contact Details
	var contactCheck = _.compact([
		page.structuredData.structuredDataNodes[11].structuredDataNodes[0].text,
		page.structuredData.structuredDataNodes[11].structuredDataNodes[1].text,
		page.structuredData.structuredDataNodes[11].structuredDataNodes[2].text,
		page.structuredData.structuredDataNodes[11].structuredDataNodes[3].text,
	]);

	// console.log(contactCheck);
	if (contactCheck.length > 0) {
		includes = includes + "::CONTENT-XML-CHECKBOX::contact";
	}

	// Includes Check
	if (includes === "") {
		includes = "::CONTENT-XML-CHECKBOX::";
	}

	// Includes Set
	page.structuredData.structuredDataNodes[0].text = includes;
}

function filterCheck() {
	if (filter1 != undefined && filter1.type != undefined && filter1.type == "multiselect" && filter1.value == "") {
		filter1.value = filter1.prefix;
	}
	if (filter2 != undefined && filter2.type != undefined && filter2.type == "multiselect" && filter2.value == "") {
		filter2.value = filter2.prefix;
	}
	if (filter3 != undefined && filter3.type != undefined && filter3.type == "multiselect" && filter3.value == "") {
		filter3.value = filter3.prefix;
	}
	if (filter4 != undefined && filter4.type != undefined && filter4.type == "multiselect" && filter4.value == "") {
		filter4.value = filter4.prefix;
	}
	if (filter5 != undefined && filter5.type != undefined && filter5.type == "multiselect" && filter5.value == "") {
		filter5.value = filter5.prefix;
	}
	if (filter6 != undefined && filter6.type != undefined && filter6.type == "multiselect" && filter6.value == "") {
		filter6.value = filter6.prefix;
	}
	if (filter7 != undefined && filter7.type != undefined && filter7.type == "multiselect" && filter7.value == "") {
		filter7.value = filter7.prefix;
	}
	if (filter8 != undefined && filter8.type != undefined && filter8.type == "multiselect" && filter8.value == "") {
		filter8.value = filter8.prefix;
	}
	if (filter9 != undefined && filter9.type != undefined && filter9.type == "multiselect" && filter9.value == "") {
		filter9.value = filter9.prefix;
	}
	if (filter10 != undefined && filter10.type != undefined && filter10.type == "multiselect" && filter10.value == "") {
		filter10.value = filter10.prefix;
	}
}
