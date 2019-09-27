const lineNum = 50;
let card = '<div class="card" style="width: 18rem;">';
card += '<img class="card-img-top" src="...">';
card += '<div class="card-body">';
card += '<h5 class="card-title"></h5>';
card += '<p class="card-text"></p>';
card += '<a href="#" class="btn btn-primary"></a>';
card += '</div>';
card += '</div>';
let grid = '<div class="col-sm-12 col-md-6 col-lg-4 gridNum"></div>';
$(document).ready(function(){
    let productMap = new Map();
    for (let i = 0; i < lineNum; i++) {
        let productName = "product"+i.toString();
        productMap.set("product".concat(i.toString()),"This is the " + productName +"'s fake description");
    }
    let $nav = $("#navRow");
    $nav.append(grid);
    for(let i = 0; i < lineNum; ++i){
        let productName = "product"+i.toString();
        let $html = $('<a></a>', {
            "data-toggle": 'modal',
            "text":productName,
            "href":"#",
            "data-target":"#exampleModalLong",
        });
        $html.click(modal);
        $nav.append(grid);
        $nav.children().eq(i).html($html);
        $('#girdRow').append(grid);
        // use same class gridNum have to use the father or the children selector nm$l
        $(".gridNum:eq("+i+")","#girdRow").text(productName).append(card);
        $(".card-img-top:eq("+i+")").attr({"src":"/public/img/"+i.toString()+".jpeg","alt":productName});
        $(".card-title:eq("+i+")").text(productName);
        $(".card-title:eq("+i+")").text(productMap.get(productName));
        $(".btn:eq("+i+")").attr("href","http://www.google.com/search?q="+productName).text("Google "+ productName);
    }
    $('#nav-btn').click(navFn);
    function navFn(){
        let $navDiv = $('.nav');
        let display = $navDiv.css("display");
        if(display ==='none')
            $navDiv.css("display","inline");
        else
            $navDiv.css("display","none");
    }
    function modal(){
        let productName = $(this).text();
        $(".modal-title","#exampleModalLong").text(productName);
        $(".modal-body","#exampleModalLong").text(productName.toUpperCase()+
                                                        "'s fake description with more detail.\n\n" +
                                                        "Why people love money?\n" + answer );
    }
});
const answer = `First, I think there are two errors in the question. The first is subtle but important error in the question. Most people don’t love “money”, in fact, very few do. We may love what money can do. The second error may be in my reading of the question, but it seems like the question is saying that everyone loves money to the same extent. That isn’t true.\n\n Money empowers you. Nearly everyone likes having at least some power. For instance, just about everyone wants the power to be able to eat, have clothing and shelter and otherwise meet basic needs. Beyond that, things vary. How much power over what things do you want? What are you willing to give up to get that power?\n\n This varies a lot. Some people place a very high value on items that can be gotten with money - fancy food and clothes; luxury travel; a large house - others place less value on that and more on things that can’t necessarily be gotten with money - free time, for instance, or pursuing a career that you love even if it is not very remunerative.`;

