var twoSum = function(nums, target) {

    let i =0 ,j=1 , sum ;
    while(i<nums.length && sum !==target){

        while(j<nums.length && sum !==target){
            sum = nums[i]+nums[j]
                j++;
        }

        if (sum !==target) {
            i++;
            j = i+1;
        }
        
    }

    return [i,j-1]
    
};




var isPalindrome = function(x) {

    if (x < 0) {
        return false; 
    }

    let str = x.toString();
    let left =0 ; 
    let right = str.length -1

    while (right>left) {
        
        if (str[right]!== str[left]) {
            return false
        }
        left ++
        right --
    }

    return true
    
};


var containsDuplicate = function(nums) {

    let i=0 , j=1
    while (i<nums.length) {
        while (j<nums.length) {
            if (nums[i]===nums[j]) {
                return true
            }
            j++
        }
        i++;
        j=i+1;
    }

    return false
    
};


var maxProfit = function(prices) {

    let minprice = prices[0];
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        
        if (prices[i]<minprice) {
            minprice = prices[i]
        }else{
            maxProfit = Math.max(maxProfit,prices[i]-minprice)       
        }
        
    }

    return maxProfit
    
};




var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // Sort the array in ascending order
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i === 0 || (i > 0 && nums[i] !== nums[i - 1])) {
            let left = i + 1;
            let right = nums.length - 1;
            const target = -nums[i];

            while (left < right) {
                const sum = nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
};



var removeNthFromEnd = function(head, n) {
   let p = head;

   let length 

   while (p.next ==!null) {
        length++
   }

   p = head

   for (let i = 0; i < length-n-1; i++) {
     p = p.next
   }

   x = p.next

   p.next = x.next
   x.next = null

   x.distroy
   


  

   return head;

};



var search = function(nums, target) {

    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let m = Math.floor((left + right) / 2);

        if (nums[m] === target) {
            return m
        }


        if (nums[m] > nums[right]) {
            if (target < nums[m] && target >= nums[left]) {
                right = m - 1;
            } else {
                left = m + 1;
            }
        } else {
            if (target > nums[m] && target <= nums[right]) {
                left = m + 1;
            } else {
                right = m - 1;
            }
        }

            
    }
        

    return -1
 
};



var topKFrequent = function(nums, k) {
    nums.sort()
    const frequencyMap = new Map();

    let i=0


    while (i < nums.length) {
        let cmp = 1
        while (nums[i]===nums[i+1]) {
            cmp++
            i++
        }

        frequencyMap.set(nums[i],cmp)

        i++
    }
     keyValueArray = Array.from(frequencyMap)

     j = [1,5,1,1,2,2,3]
     j.sort((a, b) => a-b);
     return j //keyValueArray.slice(0, k).map(([key]) => key)
};


 lengthOfLongestSubstring = function(s) {
    let arr=[]
    let str = ""
    for (let i = 0; i < s.length; i++) {

        if (str.includes(s[i])) {
            arr.push(str)
            str = s[i]
        }else{
            str = str + s[i]
        }
        
        
    }
    arr.push(str)


    const maxLength = arr.reduce((max, str) => {
        return Math.max(max, str.length);
    }, 0);
    

    return arr
    
    
    
};


var searchMatrix = function(matrix, target) {

    let i = 0


    while (i < matrix.length && target > matrix[i][matrix[i].length - 1]) {
        i++;
    }

    if (i >= matrix.length) {
        return false;
    }

    
    if (matrix[0].length===1 && matrix.length === 1 && matrix[0][0] !== target ) {
        return false 
    }


    left = 0;
    right = matrix[0].length

    while (left<=right) {
        let m = Math.floor((right+left)/2)

        if (matrix[i][m]===target) {
            return true
        }

        if (matrix[i][m]>target) {
            right = m -1
        }

        if (matrix[i][m]<target) {
            left = m + 1
        }
    }

    return false

    
};



console.log(searchMatrix([[2,1,5]],0));