var React = require('react/addons')
  , cx = React.addons.classSet
  , dates = require('../util/dates')
  , transferProps = require('../util/transferProps')
  , _ = require('lodash')


module.exports = React.createClass({

  displayName: 'CalendarWeek',

  propTypes: {
    days:           React.PropTypes.arrayOf(React.PropTypes.instanceOf(Date)),
    selectedDate:   React.PropTypes.instanceOf(Date),
    focusedDate:    React.PropTypes.instanceOf(Date),
    month:          React.PropTypes.number,
    year:           React.PropTypes.number,
  },

  getInitialState: function(){
    return {
      hovering: null,
      focused:  null
    }
  },

  render: function(){
    var self = this;

    return transferProps(
      _.omit(this.props, 'days', 'onClick'),
      
      <tr>{ _.map(this.props.days, (day, idx) => {
        return !dates.inRange(day, this.props.min, this.props.max)
            ? <td className='rw-empty-cell'>&nbsp;</td>
            : (<td>
                <btn onClick={_.partial(this.props.onClick, day)} 
                  className={cx({ 
                    'rw-off-range':      dates.month(day) !== this.props.month,
                    'rw-state-focus':    dates.eq(day, this.props.focusedDate,  'day'),
                    'rw-state-selected': dates.eq(day, this.props.selectedDate, 'day'),
                  })}>
                    {dates.format(day, 'dd')}
                </btn>
              </td>)
      })}
      </tr>
    )
  },

  _onClick: function(date, index){
    this.props.onClick(date, index)
  }

})

var btn = require('../common/btn.jsx')