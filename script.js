$(document).ready(function(){

    $("#clear-form").on("click", function () {
        $("#search-term").val("");
        $("#start-year").val("");
        $("#end-year").val("");
    });
    
    $("#clear-articles").on("click", function () {
        $("#results").empty();
    });

    $("#search").on("click", function() {

    
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $("#search-term").val(); 
        var apiKey = "&api-key=4gaXx43Yl23NFM7oZsdNGWDgwN7bI8aY";
        // var queryURL = url+keyword+apiKey;

    if ($("#search-term").val().length === 0) {
        alert("Please enter in a search term");
        return;
    }    

    if ($("#start-year").val() > 0) {
        url += "&begin_date=" + $("#start-year").val() + "0101"; 
    } 
    if ($("#end-year").val() > 0) {
        url += "&end_date=" + $("#end-year").val() + "1231";
    } 
     
    url = url + apiKey
    console.log(url);

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    
    var results = response.response.docs;
    for (var i = 0; i < $("#num-of-results").val(); i++) {
        var newsDiv = $("<div>");
        var headline = $("<h3>").text(`Title: ${results[i].headline.main}`);
        var newsLink = $("<a>").text(results[i].web_url);
        var p = $("<ul>").text(`Summary: ${results[i].abstract}`);
        var publishDate = $("<ul>").text(`Publish Date: ${results[i].pub_date}`);
        
        newsLink.attr("href", results[i].web_url)
        newsDiv.append(headline);
        newsDiv.append(newsLink);
        newsDiv.append(publishDate)
        newsDiv.append(p);
        $("#results").append(newsDiv)
    }})



})});
