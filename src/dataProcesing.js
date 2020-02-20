export const Unemployment_Education = (data) =>{
    const Unemployed = {
                        "Completed Phd":0,
                        "Some Phd":0,
                        "Completed Masters":0,
                        "Some Masters":0,                           
                        "Completed Undergraduate":0,
                        "Some Undergraduate":0,
                        "High School or GED":0,
                        "Some highschool":0}
    const Employed = {...Unemployed}

    const un = []
    const em = []
    for(let i=0; i <data.length ; i+=1){
        if (data[i].Unemployed === "1"){
            if (  Object.keys(Unemployed).includes(data[i].Education) )
                Unemployed[data[i].Education] += 1
            else
                Unemployed[data[i].Education] = 1
        }
        if (data[i].Unemployed === "0"){
            if (  Object.keys(Employed).includes(data[i].Education) )
                Employed[data[i].Education] += 1
            else
                Employed[data[i].Education] = 1
        }
    }

    for(const e in Unemployed){
        un.push({"name":e, "height": Unemployed[e]})
    }
    for(const e in Employed){
        em.push({"name":e, "height": Employed[e]})
    }
        return [un,em]
}

export const ResumeeGapAndSalary = (data) =>{
    const un = []
    const em = []

    const Unemployed = {
        "Under 10":0,
        "10 - 19":0,
        "20 - 39":0,
        "40 - 59":0,                           
        "60 - 79":0,
        "80 - 99":0,                           
        "Over 100":0,
        }
    const Employed = {...Unemployed}

    for(let i=0; i <data.length ; i+=1){
        if (data[i].Unemployed === "1"){
            if (  parseInt(data[i].TotalLengthOfGapsInResume) <10 ){
                Unemployed["Under 10"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <20 ){
                Unemployed["10 - 19"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <40 ){
                Unemployed["20 - 39"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <60 ){
                Unemployed["40 - 59"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <80 ){
                Unemployed["60 - 79"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <100 ){
                Unemployed["80 - 99"] +=1
            }else{
                Unemployed["Over 100"] +=1
            }
        }else{
            if (  parseInt(data[i].TotalLengthOfGapsInResume) <10 ){
                Employed["Under 10"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <20 ){
                Employed["10 - 19"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <40 ){
                Employed["20 - 39"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <60 ){
                Employed["40 - 59"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <80 ){
                Employed["60 - 79"] +=1
            }else if(  parseInt(data[i].TotalLengthOfGapsInResume) <100 ){
                Employed["80 - 99"] +=1
            }else{
                Employed["Over 100"] +=1
            }
        }
        
    }
    for(const e in Unemployed){
        un.push({"name":e, "height": Unemployed[e]})
    }
    for(const e in Employed){
        em.push({"name":e, "height": Employed[e]})
    }
    console.log(un,em)
    return [un,em]

}

// Input(3 types) = >$xx,000-$xx,999 , $200,000+, Prefer not to answer
// Output(Average) = > 75,000 , 200,000
function getHouseholdIncome(input){
    let money = input.split("-$");

    let Average = 0

    if (input ==="$200,000+"){
        Average = 200000
    }
    else if(input ==="$0-$9,999"){
        Average = 5000
    }else{
        
        let minMoney = money[0].slice(1,money[0].length-1).replace(",","")
        console.log(money[1])
        let maxMoney = money[1].replace(",","")
        Average = (parseInt(minMoney) + parseInt(maxMoney)+1 ) / 2
    }

    return Average
    
}

export const AnnualSalarybyMentalIllness = (data) => {


    const self_illness = []
    const Nonself_illness = []
    for(let i=0; i <data.length ; i+=1){
        if(data[i].SelfMentalIllness === "0"){ // self identified illness
            Nonself_illness.push({"price":parseInt(data[i].AnnualIncome)})
        }else{
            self_illness.push({"price":parseInt(data[i].AnnualIncome)})
        }
    }


    return [self_illness,Nonself_illness]

}