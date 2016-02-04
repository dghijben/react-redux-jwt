import _ from 'lodash';
import React from 'react';
import {DoughnutTextInside} from 'react-chartjs';

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
        <DoughnutTextInside data={options.chartData} options={{responsive: true}}/>
        <div className="center"><strong>{options.desc}</strong> {options.goal}</div>
      </div>);
  }

  makeOptions(goal, leads, leadsExtern) {
    const chartData = [];
    if (leads === 0 && leadsExtern === 0) {
      chartData.push({
        value: 1,
        color: '#eee',
        highlight: '#eee',
        label: '100% open'
      });
    } else if (leads > 0 && leadsExtern === 0) {
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
    } else if (leads > 0 && leadsExtern > 0) {
      const proc = Math.round(100 / goal * (leads > goal ? goal : leads));
      const procExtern = Math.round(100 / goal * (leadsExtern > goal ? goal : leadsExtern));
      chartData.push({
        value: (leads > goal ? goal : leads),
        color: 'rgba(63, 63, 191, 0.75)',
        highlight: 'rgba(63, 63, 191, 1)',
        label: proc + '% behaald',
        leads: (leads > goal ? goal : leads)
      });
      chartData.push({
        value: (leadsExtern > goal ? goal : leadsExtern),
        color: 'rgba(63, 191, 63, 0.75)',
        highlight: 'rgba(63, 191, 63, 1)',
        label: procExtern + '% extern  behaald',
        leads: (leadsExtern > goal ? goal : leadsExtern)
      });
      chartData.push({
        value: (goal - leads - leadsExtern < 0 ? 0 : goal - leads - leadsExtern),
        color: '#eee',
        highlight: '#eee',
        label: (100 - proc - procExtern) + '% open'
      });
    }
    return chartData;
  }

  charts() {

    const leads = Math.round(_.sum(_.get(this.props, ['profile', 'leads', 'data'], []), (obj) => {
      return obj.amount;
    }));
    const goal1 = _.get(this.props, ['profile', 'goal1'], 0);
    const extern = _.get(this.props, ['profile', 'extern'], 0);

    const options1 = {
      chartData: this.makeOptions(goal1, leads, extern),
      leads: (leads > goal1 ? goal1 : leads),
      goal: goal1,
      className: 'col-md-offset-2 col-md-8',
      desc: 'Doel'
    };

    return (
      <div>
        {this.chart(options1)}
      </div>
    );
  }

  render() {
    if (!_.has(this.props.profile, 'goal1')) {
      return (<div></div>);
    }

    if (this.props.profile.goal1 === 0) {
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
