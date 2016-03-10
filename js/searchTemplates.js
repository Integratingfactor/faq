(function(){
    var app = angular.module('search-templates', ['github-faq-client', 'page-templates']);

    app.directive('searchTab', function(GithubFaqClient, TabTracker){
        return {
            restrict: 'E',
            templateUrl: '/site/search/search-tab.html',
            controller: function($log){
                this.docTab = 1;
                this.issueTab = 2;
                this.searchResults = [];
                this.issueResults = [];
                this.faqRepo = 'Integratingfactor/faq';
                this.issuesRepo = 'Integratingfactor/lib-idp-client';
                this.searchTxt = null;
                var self = this;
                this.isDocumentation = function() {
                    return this.docTab === TabTracker.getCurrTab();
                };
                this.getSectionItems = function() {
                    return homeSectionItems;
                };
                this.search = function() {
                    if (!self.searchTxt) return;
                    if (self.isDocumentation()) {
                        self.searchDocumentation();
                    } else {
                        self.searchIssues();
                    }
                };
                this.searchDocumentation = function() {
                    if (!self.searchTxt) return;
                    // GithubFaqClient.queryInIssues(self.searchTxt, self.faqRepo, function(data){
                    GithubFaqClient.queryInRepo(self.searchTxt, self.faqRepo, function(data){
                        $log.log("got search count", data.total_count,data);
                        if (data.total_count == 0) {
                            self.searchResults = [{question: "no match found"}]
                            return;
                        }
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
                };
                this.searchIssues = function() {
                    if (!self.searchTxt) return;
                    GithubFaqClient.queryInIssues(self.searchTxt, self.issuesRepo, function(data){
                    // GithubFaqClient.queryInRepo(self.searchTxt, self.faqRepo, function(data){
                        $log.log("got search count", data.total_count,data);
                        // clear out old search results
                        self.searchResults = [];
                        for (item in data.items) {
                            $log.log("fetching FAQ item", data.items[item]);
                            GithubFaqClient.getIssueComments(data.items[item].comments_url, data.items[item], function(issue, comments){
                                $log.log("got FAQ item", comments);
                                // var decoded = JSON.parse(atob(data.content));
                                // $log.log("decoded item is", decoded);
                                self.searchResults.push( { question: self.issue2html(issue.body),
                                    answer: self.issue2html(comments[0].body)
                                });
                            }, function(issue, error){
                                $log.log("Failed to fetch FAQ item", error);
                            });
                        }
                    }, function(error){
                        $log.log("Failed to search", error);
                        self.searchResults = [];
                    });
                };
                this.issue2html = function(md){
                    var html = '<pre>';
                    var lines = md.split('\n');
                    for (line in lines) {
                        html = html.concat(lines[line]);
                    }
                    html = html.concat('</pre>');
                    return html;
                };
                // this.getTitle = function(index) {
                //     $log.log("sending back", index, self.searchResults);
                //     return self.searchResults[index].title;
                // };
                // this.getIntro = function(index) {
                //     return self.searchResults[index].intro;
                // };
                // this.getBody = function(index) {
                //     return self.searchResults[index].body;
                // };
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

    app.filter("issue2html", ['$sce', function($sce) {
      return function(md){
        var html = '<pre>';
        var lines = md.split('\n');
        for (line in lines) {
            html = html.concat(lines[line]);
        }
        html = html.concat('</pre>');
        return html;
      }
    }]);

})();