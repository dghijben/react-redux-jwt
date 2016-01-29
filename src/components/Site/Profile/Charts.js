import _ from 'lodash';
import React from 'react';
import {Doughnut} from 'react-chartjs';

class Charts extends React.Component {

  constructor() {
    super();
    this.chart = this.chart.bind(this);
    this.makeOptions = this.makeOptions.bind(this);
    this.charts = this.charts.bind(this);
  }

  chart(options) {
    return (
      <div className={options.className}>
        <Doughnut data={options.chartData} options={{responsive: true}}/>
        <div className="center"><strong>{options.desc}</strong> {options.leads} / {options.goal}</div>
      </div>);
  }


  makeOptions(goal, leads) {
    const chartData = [];
    if (leads === 0) {
      chartData.push({
        value: 0,
        color: '#eee',
        highlight: '#eee',
        label: '100% open'
      });
    } else if (leads > 0) {
      const proc = Math.round(100 / goal * (leads > goal ? goal : leads));
      chartData.push({
        value: (leads > goal ? goal : leads),
        color: 'rgba(151,187,205,0.75)',
        highlight: '#eee',
        label: proc + '% behaald',
        leads: (leads > goal ? goal : leads)
      });
      chartData.push({
        value: (goal - leads < 0 ? 0 : goal - leads),
        color: '#eee',
        highlight: '#eee',
        label: (100 - proc) + '% open'
      });
    }
    return chartData;
  }

  charts() {
    const leads = 100;
    const goal1 = this.props.profile.goal1;
    const goal2 = this.props.profile.goal2;

    if (goal1 > 0 && goal2 === 0) {
      const options = {
        chartData: this.makeOptions(goal1, leads),
        leads: leads,
        goal: goal1,
        className: 'col-md-12',
        desc: 'Doel 1'
      };

      return this.chart(options);
    }

    const options1 = {
      chartData: this.makeOptions(goal1, leads),
      leads: (leads > goal1 ? goal1 : leads),
      goal: goal1,
      className: 'col-md-6',
      desc: 'Doel 1'
    };
    const leads2 = (leads - goal1 > 0 ? leads - goal1 : 0);
    const options2 = {
      chartData: this.makeOptions(goal2, leads2),
      leads: leads2,
      goal: goal2,
      className: 'col-md-6',
      desc: 'Doel 2'
    };

    return (
      <div>
        {this.chart(options1)}
        {this.chart(options2)}
      </div>
    );
  }

  render() {
    if (!_.has(this.props.profile, 'goal1')) {
      return (<div></div>);
    }

    if (this.props.profile.goal1 === 0 && this.props.profile.goal2 === 0) {
      return (<div></div>);
    }

    return (
      <div className="row charts">
        {this.charts()}
      </div>
    );
  }
}

Charts.propTypes = {
  profile: React.PropTypes.object
};
Charts.defaultProps = {};

export default Charts;
