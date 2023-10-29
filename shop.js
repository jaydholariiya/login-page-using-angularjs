const app = angular.module('ShopModule',[]);

app.controller('ShopController',['$scope','$http',function($scope,$http)
{
    $scope.edit = true;
    $scope.ValidateUser = function(user)
    {
       
        if(user.unm == "Admin" && user.pwd == "Admin")
        {
            $scope.login = 1;
        }
        else
        {
            $scope.message = "Inavlid Username and Password !!"
            $scope.login = -1;
        }
            
    }
    $scope.productList = [];
    $scope.getProducts = function()
    {
        $http.get('/api/getProducts').then((response)=>
        {
            $scope.productList = response.data
        })
        $scope.login = 1;
    }
    $scope.getProducts();

    $scope.DeleteProduct = function(id)
    {
        alert("Product Deleted");
        $http.delete(`/api/deleteProduct/${id}`).then((response)=>
        {
            $scope.login = 1;
        })
        $scope.getProducts();
        $scope.login = 1;
    }

    $scope.SingleProduct = function(up)
    {
        $scope.edit = false
        $scope.Update = up;
        $scope.login = 1;
    }

    $scope.UpdateProduct = function(up)
    {
        $http.put(`/api/updateProduct/${up.productId}/${up.productName}/${up.productImage}/${up.productCategory}/${up.productPrice}`,up).then((response)=>
        {
            alert("Data Updated")
            $scope.login = 1;
        })
        $scope.getProducts();
        $scope.edit = true;
        
    } 
}])