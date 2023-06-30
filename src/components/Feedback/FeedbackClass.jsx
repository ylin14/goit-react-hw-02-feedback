import React from 'react';
import Section from '../Section/Section';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistic from '../Statistic/Statistic';
import Notification from '../Notification/Notification';

const options = ['good', 'neutral', 'bad'];

class FeedbackClass extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,

  }

// add feedback to state
  handleClick = data => {
    this.setState(prevState => ({
      [data]: prevState[data] + 1,
    }));
  };

//count total amount of feedback
  countTotalFeedback() {
    const values = Object.values(this.state);
    return values.reduce((value, acc) => (acc += value), 0);

  }

  //count positive feedback percentage
  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback();
    return Math.ceil((this.state.good / total) * 100);
  }
  render() {
    const total = this.countTotalFeedback();
    const percentage = this.countPositiveFeedbackPercentage();
    return (
      <>
        <Section title={'Please Live Feedback'}>
          <FeedbackOptions options={options} onLeaveFeedback={this.handleClick} />
        </Section>

        <Section title={'Statistics'}>
          {total ? (
            <Statistic
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={total}
              positivePercentage={percentage}
            />
          ) : (
            <Notification message={'There is no feedback'} />
          )}
        </Section>
      </>
    )
  }

}

export default FeedbackClass;
