import * as d3 from 'd3';
import * as dp from "./dataProcesing";
const MARGIN = {TOP: 50, BOTTOM: 50, LEFT: 70, RIGHT: 10};
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.BOTTOM - MARGIN.TOP;

export default class D3Chart {
	state = {
		y_axis: "helo"
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
           .attr("y",HEIGHT +50)
           .attr("text-anchor","middle")
           .text("The world's tallest men")
    
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

			vis.update('Uneployment_Education')
			// vis.updateHistogram('SelfIllness_AnnualSalary')

        })
	}

	updateHistogram(data){
		
		
		const vis = this
		
		if(data === "SelfIllness_AnnualSalary"){
			vis.data = vis.SelfIllness
		}else if(data === "NonSelfIllness_AnnualSalary"){
			vis.data = vis.NonSelfIllness
		}
		
		let x = d3.scaleLinear()
			.domain([
				d3.min(vis.data,d=>d.price) *0.95,
				d3.max(vis.data, d=> d.price)])
					.range([0,HEIGHT])
		const xAxisCall = d3.axisBottom(x)
		vis.xAixsGroup.transition(500).call(xAxisCall)

		let y = d3.scaleLinear()
			.range([HEIGHT, 0]);
			y.domain([0, d3.max(vis.data, d=> d.price)])

		const yAxisCall = d3.axisLeft(y)
		vis.yAxisGroup.transition().duration(500).call(yAxisCall)
		

		// set the parameters for the histogram
		var histogram = d3.histogram()
			.value(function(d) { return d.price; })   // I need to give the vector of value
			.domain(x.domain())  // then the domain of the graphic
			.thresholds(x.ticks(20)); // then the numbers of bins
		// And apply this function to data to get the bins
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
		rects.transition(50)

			.attr("height",d => HEIGHT - y(d.length))
			.attr("x",(d) => x(d.x0))
			.attr("y",(d) => {console.log(d.length);y(d.length)})
			// .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
			.attr("width", 20)
			.style("fill", "black")


		rects
			.enter()
			.append("rect")
				.attr("height",d => HEIGHT - y(d.length))
				.attr("x",(d) => x(d.x0))
				.attr("y",(d) => y(d.length))
				// .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
				.attr("width", 20)
				.style("fill", "#69b3a2")	
	}






    update(gender){
		const vis = this

		const y = d3.scaleLinear()
		const x = d3.scaleBand()

		// First Update
		if(gender ==="Uneployment_Education"){
			vis.data = vis.unemployment_Education
			vis.xLabel.text(`Unemployment_Education`)
			vis.yLabel.text("The number of people")
		}
		if(gender ==="Employment_Education"){
			vis.data = vis.employment_Education
			vis.xLabel.text(`Employment_Education`)
			vis.yLabel.text("The number of people")
		}
		// Second Update
		if(gender ==="UnEmployment_ResumeGap"){
			vis.data = vis.unemployment_ResumeGap
			vis.xLabel.text(`UnEmployment_ResumeGap`)
			vis.yLabel.text("The number of people")
		}
		if(gender ==="Employment_ResumeGap"){
			vis.data = vis.employment_ResumeGap
			vis.xLabel.text(`Employment_ResumeGap`)
			vis.yLabel.text("The number of people")
		}

        y.domain([
			d3.min(vis.data,d=>d.height) *0.95,
			d3.max(vis.data, d=> d.height)])
				.range([HEIGHT,0])
		x.domain(vis.data.map(d=>d.name))
			.range([0,WIDTH])
			.padding(0.4)

        const xAxisCall = d3.axisBottom(x)
        vis.xAixsGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        // DATA JOIN
        const rects = vis.svg.selectAll("rect")
                         .data(vis.data)
        //EXIT
        rects.exit().transition().duration(500)
            .attr('y',HEIGHT)
            .attr('height',0)
            .remove()

        //UPDATE
        rects.transition().duration(500)
            .attr("x",(d,i)=>x(d.name))
            .attr("y",d=>y(d.height))
            .attr("width",x.bandwidth)
			.attr("height",d => HEIGHT - y(d.height))
			.style("fill", "#69b3a2")
        // ENTER
        rects.enter().append("rect")
					.attr("x",(d,i)=>x(d.name))
					.attr("width",x.bandwidth)
					.style("fill", "#69b3a2")
					.attr("y",HEIGHT)
					
					.on('mouseover', function (d, i) {
						
						y.domain([
							d3.min(vis.data,d=>d.height) *0.95,
							d3.max(vis.data, d=> d.height)])
								.range([HEIGHT,0])
						x.domain(vis.data.map(d=>d.name))
							.range([0,WIDTH])
							.padding(0.4)
						
						d3.select(this).transition(50)
							.attr('opacity', '.85')
							.attr("y", (y(d.height)) - 10)
							.attr("height", HEIGHT - (y(d.height)) + 10)
							.attr("x", (x(d.name)) - 10)
							.attr("width",x.bandwidth() + 20)
						vis.tooltip
							.attr("x",x(d.name)+ x.bandwidth() /2 )
							.attr("y",y(d.height) - 15)
							.attr("text-anchor","middle")
							.text(d.height)
						})
						
							
				   .on('mouseout', function (d, i) {
						d3.select(this).transition()
							 .duration('50')
							 .attr('opacity', '1')
							.attr("y", (y(d.height)))
							.attr("height", HEIGHT - (y(d.height)))
							.attr("x", (x(d.name)))
							.attr("width",x.bandwidth())
						vis.tooltip
							.text("")
				   })
                     .transition().duration(500)
                     .attr("height",d => HEIGHT - y(d.height))
					 .attr("y",d=>y(d.height))

	}
	
	
}