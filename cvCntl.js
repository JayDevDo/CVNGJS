let app = angular.module('cvngjs');

app.factory(
    'cvJSONFctr', 
    ( $rootScope, $http )=>{
        if( !$rootScope.httpPromise ){ 
            $rootScope.httpPromise  = $http.get( "cvngjs.json"); 
        }
      
        return	{
            getAllCVData:	()=>{
                $rootScope.httpPromise.then( 
                    (response)=>{ 
                        $rootScope.CVcntrl.allData = response.data;
                        console.log(
                            "fctry-getAllCVData", response.data ,
                            "fctry-$rootScope.CVcntrl.allData", $rootScope.CVcntrl.allData
                        );
                        return response.data; 
                    }
                );
            },

            getSomeCVData: (section)=>{
                $rootScope.httpPromise.then( 
                    (response)=>{ 
                        console.log("response:", section )
                        console.log( response.data[section])
                        $rootScope.CVcntrl.someData = [response.data[section]] ;
                        return response.data[section]; 
                    }
                );            }
        }
    }
);

app.controller('cvJSONCntrl', cvJSONCntrl );
cvJSONCntrl.$inject = ['$scope', '$rootScope', '$http', '$filter' ,'cvJSONFctr'];
function cvJSONCntrl($scope, $rootScope, $http, $filter, cvJSONFctr) {
    $scope = $rootScope;
    $scope.dataArr = ["jobs", "jobDomains", "jobLocations", "languages", "tools", "education", "profile", "contact" ];
    $scope.dataIdx = (item)=>{ return $scope.dataArr.indexOf(item); }
        if( !$scope.CVcntrl ){
                $scope.CVcntrl = {
                                    allData:    [],
                                    someData:   [],
                                    getCVAll:   ()=>{ 
                                        let retData =  cvJSONFctr.getAllCVData();
                                        (retData)=>{ $rootScope.CVcntrl.allData = retData; }
                                        return retData;
                                    },
                                    getCVSection: (section)=>{
                                        let retData =  cvJSONFctr.getSomeCVData( $scope.dataIdx(section));
                                        console.log("getCVSection: ", section ," retData", retData);
                                        (retData)=>{ $rootScope.CVcntrl.someData = retData; }
                                        return retData;
                                    }
                }
        }

    console.log("$scope.CVcntrl.getCVAll()", $scope.CVcntrl.getCVAll() );
    
    console.log(
        "getCVKey jobDomains", $scope.CVcntrl.getCVSection( "jobDomains" ) , 
        "getCVKey 0", $scope.CVcntrl.getCVSection( 0 ) , 
        "getCVSection 0", $scope.testArr 
    );

    console.log("exit cvJSONCntrl");
}

