
angular.module('cvngjs')
    .controller('cvInit', cvInit );
    cvInit.$inject = [ '$rootScope', '$scope', '$http', 'cvJSONFctr' ];

        function cvInit( $rootScope, $scope, $http, cvJSONFctr){ 
            $scope 	= $rootScope;
            let jsonLoc = "cvngjs.json";
            $scope.dataArr = ["jobs", "jobDomains", "jobLocations", "languages", "tools", "education", "profile", "contact" ];
            $scope.dataIdx = (item)=>{ return $scope.dataArr.indexOf(item); }
            console.log("dataIdx jobs", $scope.dataIdx("jobs") );

            $scope.httpPromise  = $http.get( jsonLoc );
            $scope.httpPromise.then(function(response){
                $scope.cvContact    = response.data[7];
                $scope.cvEducations = response.data[5];
                $scope.cvJobs       = response.data[0];
                $scope.cvDomains    = response.data[1];
                $scope.cvLanguages  = response.data[3];
                $scope.cvLocations  = response.data[2];
                $scope.cvProfile    = response.data[6];
                $scope.cvTools      = response.data[4];
                console.log("enter cvInit: arrays loaded from js:", ($scope.cvJobs.length>0) );  
            });

            $scope.activeTab    =   0;
            $scope.isActTab     =   (tabNr)=>{ return (tabNr === $scope.activeTab);  }
            $scope.tabHandler   =   (tabNr)=>{  
                                        $scope.activeTab = tabNr;
                                            if($scope.CVcntrl){
                                                let nwtabsection = cvkeyArr[tabNr]; 
                                                $scope.CVcntrl.getCVSection(nwtabsection );
                                               // console.log(nwtabsection, "jobhandler len some data", $scope.CVcntrl.someData.length )
                                            }
                                        // console.log("active tab = ", tabNr );
            }

            const cvkeyArr =    [    
                "jobs",
                "jobDomains",
                "jobLocations",
                "languages",
                "tools",
                "education",
                "profile",
                "contact"
            ];
        
            $scope.activeJob    =   -1;
            $scope.isActJob     =   (jobNr)=>{ return (jobNr === $scope.activeJob);  }
            $scope.jobHandler   =   (jobNr)=>{  // if job is expanded, collapse
                                                (jobNr===$scope.activeJob)? (jobNr = -1):(jobNr=jobNr)
                                                $scope.activeJob = jobNr ;
                                                // console.log("active job = ", jobNr );    
            }

            $scope.jobFilter    = (jobId)=>{ return $scope.fltrArr[jobId] } 
            $scope.fltrArr      =  [ true, true, true, true, true, true, true, true, true, true, true, true, true ];
            $scope.fltrRes      =   {
                                        "active":   false,
                                        "key":      {"srchKey": 'none', "value": ''},
                                        "found":    0                
            }

            $scope.clearFilter = ()=>{ 
                                        $scope.fltrRes = {
                                                            "active": false,
                                                            "key": {"srchKey": 'none', "value": ''},
                                                            "found": 0                
                                        }
                                        $scope.fltrArr = [ true, true, true, true, true, true, true, true, true, true, true, true, true ];
            }

            $scope.fltrByDomain =   (domain)=>{
                                        console.log("fn fltrByDomain called", domain);
                                        $scope.clearFilter();
                                            if( domain==="Customer Service"){ domain="CS" }
                                        $scope.fltrRes.key.srchKey   = "job Domain";
                                        $scope.fltrRes.key.value     = domain;
                                        $scope.fltrRes.active        = true;
                                        $scope.fltrRes.found         = 0;
                                            for(let i=0; i<$scope.cvJobs.length ;i++){
                                                let jDomain = $scope.cvJobs[i].jobDomain;
                                                    if( jDomain.includes(domain) ){ 
                                                        $scope.fltrArr[i] = true;
                                                        $scope.fltrRes.found++ ;
                                                    }else{
                                                        $scope.fltrArr[i] = false;
                                                    }
                                            }
                                        console.log(
                                                    "$scope.fltrArr:", $scope.fltrArr, lr, 
                                                    "$scope.fltrRes:", $scope.fltrRes 
                                        );
                                        $scope.tabHandler(1);    
            }

            $scope.fltrByCountry =   (loc)=>{
                                        console.log("fn fltrByCountry called", loc );
                                        $scope.clearFilter();
                                        $scope.fltrRes.key.srchKey   = "Country";
                                        $scope.fltrRes.key.value     = loc ;
                                        $scope.fltrRes.active        = true;
                                        $scope.fltrRes.found         = 0;
                                            for(let i=0; i<$scope.cvJobs.length ;i++){
                                                let jLoc = $scope.cvJobs[i].countryAndlocation;
                                                    if( jLoc.includes(loc) ){ 
                                                        $scope.fltrArr[i] = true;
                                                        $scope.fltrRes.found++ ;
                                                    }else{
                                                        $scope.fltrArr[i] = false;
                                                    }
                                            }
                                        console.log(
                                                    "$scope.fltrArr:", $scope.fltrArr, lr, 
                                                    "$scope.fltrRes:", $scope.fltrRes 
                                        );
                                        $scope.tabHandler(1);
            }

            console.log("end of cvNG.js cvInit");
        }
