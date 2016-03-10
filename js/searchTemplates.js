(function(){
    var app = angular.module('search-templates', ['github-faq-client', 'page-templates']);

    app.directive('searchTab', function(GithubFaqClient, TabTracker){
        return {
            restrict: 'E',
            templateUrl: '/site/search/search-tab.html',
            controller: function($log){
                this.myTab = 1;
                this.searchResults = [{"title":"test title",
                "intro" : "test intro",
                "body" : "test body"}];
                this.faqRepo = 'Integratingfactor/faq';
                this.searchTxt = null;
                var self = this;
                this.isActive = function() {
                    return this.myTab === TabTracker.getCurrTab();
                };
                this.getSectionItems = function() {
                    return homeSectionItems;
                };
                this.search = function() {
                    if (!self.searchTxt) return;
                    GithubFaqClient.queryInRepo(self.searchTxt, self.faqRepo, function(data){
                        $log.log("got search count", data.total_count,data);
                        // clear out old search results
                        self.searchResults = [];
                        for (item in data.items) {
                            $log.log("fetching FAQ item", data.items[item]);
                            GithubFaqClient.getFaqItem(data.items[item].git_url, function(data){
                                $log.log("got FAQ item", data);
                                var decoded = JSON.parse(atob(data.content));
                                $log.log("decoded item is", decoded);
                                self.searchResults.push(decoded);
                            }, function(error){
                                $log.log("Failed to fetch FAQ item", error);
                            });
                        }
                    }, function(error){
                        $log.log("Failed to search", error);
                        self.searchResults = [];
                    });
                this.getTitle = function(index) {
                    $log.log("sending back", index, self.searchResults);
                    return self.searchResults[index].title;
                };
                this.getIntro = function(index) {
                    return self.searchResults[index].intro;
                };
                this.getBody = function(index) {
                    return self.searchResults[index].body;
                };
                };
            },
            controllerAs: 'search'
        };
    });

    app.directive('searchTabSection', function(){
        return {
            restrict: 'E',
            templateUrl: '/site/search/search-tab-section.html'
        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }]);

})();