import * as d3 from 'd3';
import * as dp from "./dataProcesing";
const MARGIN = {TOP: 100, BOTTOM: 100, LEFT: 70, RIGHT: 10};
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.BOTTOM - MARGIN.TOP;

export default class D3Chart {
	state = {
		y_axis: ""
	}
    constructor(element){
        const vis = this

        vis.svg = d3.select(element)
                      .append("svg")
                      .attr("width",WIDTH +MARGIN.LEFT + MARGIN.RIGHT)
                      .attr("height",HEIGHT +MARGIN.BOTTOM + MARGIN.TOP)
                      .append("g")
                      .attr("transform",`translate(${MARGIN.LEFT},${MARGIN.TOP})`)
        vis.xLabel = vis.svg.append('text')
           .attr("x",WIDTH/2)
		   .attr("y",HEIGHT+50)
		   
		
           .attr("text-anchor","middle")
           .text("")
    
		vis.yLabel = vis.svg.append('text')
           .attr("x",-(HEIGHT/2))
           .attr("y",-50)
           .attr("text-anchor","middle")
           .text(this.state.y_axis)                
           .attr("transform",`rotate(-90)`)

		vis.tooltip = vis.svg.append('text')
           

		


        vis.xAixsGroup = vis.svg.append('g')
                                .attr("transform",`translate(0,${HEIGHT})`)
        vis.yAxisGroup = vis.svg.append('g')


		
        Promise.all([
			d3.csv("/Unemployment_mental_illness.csv")
        ]).then( (dataset)=>{
			// First Comparing
			let [a,b] = dp.Unemployment_Education(dataset[0])
			vis.unemployment_Education =a;vis.employment_Education = b

			// Second Comparing
			let [c,d] = dp.ResumeeGapAndSalary(dataset[0])
			vis.unemployment_ResumeGap = c;vis.employment_ResumeGap = d

			let [e,f] = dp.AnnualSalarybyMentalIllness(dataset[0])
			vis.SelfIllness = e; vis.NonSelfIllness = f

			let [g,h] = dp.ResumeGapbyMentalIllness(dataset[0])
			vis.SelfIllness_resumegap = g; vis.NonSelfIllness_resumegap = h
			// vis.update('Uneployment_Education')
			vis.updateHistogram('SelfIllness_AnnualSalary',2)
			let [i,j] = dp.HaveAnxiety_HowManyDaysHospitalized(dataset[0])
			vis.anxiety_hospitalized = i; vis.Donthave_anxiety_hospitalized = j
        })
	}

	updateHistogram(data,sliderValue){
		
		
		const vis = this
		
		if(data === "SelfIllness_AnnualSalary"){
			vis.data = vis.SelfIllness
			vis.xLabel.text("Salary(THOUSANDS OF DOLLARS)")
			vis.yLabel.text("The Number of Self Illiness People")

		}else if(data === "NonSelfIllness_AnnualSalary"){
			vis.data = vis.NonSelfIllness_resumegap
			vis.xLabel.text("Salary(THOUSANDS OF DOLLARS)")
			vis.yLabel.text("The Number of Non Self Illiness People")
		}else if(data === "SelfIllness_TotalLengthOfGapsInResume"){
			vis.data = vis.SelfIllness_resumegap
			vis.xLabel.text("Resume Gap(Days)")
			vis.yLabel.text("The Number of Self Illines People")
		}else if(data === "NonSelfIllness_TotalLengthOfGapsInResume"){
			vis.data = vis.NonSelfIllness
			vis.xLabel.text("Resume Gap(Days)")
			vis.yLabel.text("The Number of Non Self Illiness People")
		}else if(data === "HaveAnxiety_HowManyDaysHospitalized"){
			vis.data = vis.anxiety_hospitalized
			vis.xLabel.text("How Many Days Hospitalized(Days)")
			vis.yLabel.text("The Number of People who have Anxiety")
		}else if(data === "DontHaveAnxiety_HowManyDaysHospitalized"){
			vis.data = vis.Donthave_anxiety_hospitalized
			vis.xLabel.text("How Many Days Hospitalized(Days)")
			vis.yLabel.text("The Number of People who don't Have Anxiety")
		}
		
		let x = d3.scaleLinear()
			.domain([
				d3.min(vis.data,d=>d.price) *0.95,
				d3.max(vis.data, d=> d.price * (sliderValue +1) / sliderValue)])
					.range([0,WIDTH])
		const xAxisCall = d3.axisBottom(x)
		vis.xAixsGroup.transition(500).call(xAxisCall)

		let y = d3.scaleLinear()
			.range([HEIGHT, 0]);
			y.domain([0, d3.max(vis.data, d=> d.price)])

		const yAxisCall = d3.axisLeft(y)
		vis.yAxisGroup.transition().duration(500).call(yAxisCall)
		

		var histogram = d3.histogram()
			.value(function(d) { return d.price; })
			.domain(x.domain())
			.thresholds(x.ticks(sliderValue));
			console.log(sliderValue,x.ticks(sliderValue))

		var bins = histogram(vis.data);

		// Join
		const rects  = vis.svg.selectAll("rect").data(bins)
		// EXIT
		rects
			.exit().transition(500)
			.attr('y',HEIGHT)
			.attr('height',0)
			.remove()
		// UPDATE
		
		rects.transition(500)
			.attr("height",d => HEIGHT - y(d.length))
			.attr("x",(d) => x(d.x0))
			.attr("y",(d) => y(d.length))
			.attr("width", x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]))
			.style("fill", "#69b3a2")	
		
		rects.on('mouseover', function (d, i) {
			y.domain([0, d3.max(vis.data, d=> d.price)])
			x.domain([
				d3.min(vis.data,d=>d.price) *0.95,
				d3.max(vis.data, d=> d.price * (sliderValue +1) / sliderValue)])
					.range([0,WIDTH])
			
			d3.select(this).transition(50)
				.attr('opacity', '.85')
				.attr("x", x(d.x0) - 5)
				.attr("y", y(d.length) - 10)
				.attr("height", HEIGHT - y(d.length) + 10)
				

				.attr("x",(d) => x(d.x0))
				.attr("y",(d) => y(d.length))
				.attr("width", x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]) + 10)
			console.log((x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]) /2)
			vis.tooltip
				.attr("x",x(d.x0) + x((x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0])) /2 )
				.attr("y",y(d.length) - 15)
				.attr("text-anchor","middle")
				.text(d.length)
			})
			
				
	   rects.on('mouseout', function (d, i) {
			d3.select(this).transition()
				.duration('50')
				.attr('opacity', '1')
				.attr("x", x(d.x0))
				.attr("y", y(d.length))
				.attr("height", HEIGHT - y(d.length))
				.attr("width", x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]))
			vis.tooltip
				.text("")
	   })






		rects
			.enter()
			.append("rect")
				.attr("height",d => HEIGHT - y(d.length))
				.attr("x",(d) => x(d.x0))
				.attr("y",(d) => y(d.length))
				.attr("width",x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]))
				.style("fill", "#69b3a2")	
		
				
				.on('mouseover', function (d, i) {
					y.domain([0, d3.max(vis.data, d=> d.price)])
					x.domain([
						d3.min(vis.data,d=>d.price) *0.95,
						d3.max(vis.data, d=> d.price * (sliderValue +1) / sliderValue)])
							.range([0,WIDTH])
					
					d3.select(this).transition(50)
						.attr('opacity', '.85')
						.attr("x", x(d.x0) - 5)
						.attr("y", y(d.length) - 10)
						.attr("height", HEIGHT - y(d.length) + 10)
						

						.attr("x",(d) => x(d.x0))
						.attr("y",(d) => y(d.length))
						.attr("width", x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]) + 10)
					vis.tooltip
						.attr("x",x(d.x0) + x((x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0])) /2 )
						.attr("y",y(d.length) - 15)
						.attr("text-anchor","middle")
						.text(d.length)
					})
					
						
			   .on('mouseout', function (d, i) {
					d3.select(this).transition()
						.duration('50')
						.attr('opacity', '1')
						.attr("x", x(d.x0))
						.attr("y", y(d.length))
						.attr("height", HEIGHT - y(d.length))
						.attr("width", x(x.ticks(sliderValue)[1] - x.ticks(sliderValue)[0]))
					vis.tooltip
						.text("")
			   })








	}
	
}