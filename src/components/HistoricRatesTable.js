import React, { Component, Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Query } from 'react-apollo';
import { HistoricRatesStyles as styles } from '../styles';
import { HistoricRatesHeader, HistoricRatesBody } from '.';
import { GET_LOCATION } from '../operations';

export default class HistoricRatesTable extends Component {
  static propTypes = {
  }

  state = {
    ratesData: []
  }

  onClickDropDown = () => {
    this.setState(() => ({
      ratesData: []
    }));
  }

  render() {
    return (
      <Fragment>
        <View style={styles.filterView}>
          <Text style={styles.filterText}>Showing: </Text>
          <TouchableOpacity onPress={() => { this.dropDown && this.dropDown.show(); }}>
            <View style={styles.modalView}>
              <ModalDropdown ref={(el) => { this.dropDown = el; }}
                options={['All time', 'Last 7 days', 'Today', 'This month']}
                defaultValue={'All time'}
                style={styles.modal}
                textStyle={styles.buttonText}
                dropdownStyle={styles.dropdown}
                dropdownTextStyle={styles.dropdowntext}
                adjustFrame={(style) => {
                  style.height = 88;
                  style.top = 144;
                  return style;
                }}
                onSelect={() => { this.onClickDropDown(); }}
              />
              <Text style={styles.arrow}>▼</Text>
            </View>
            <View style={styles.hr}></View>
          </TouchableOpacity>
        </View>
        <HistoricRatesHeader />
        <Query query={GET_LOCATION}>
          {({ data, error, loading }) => {
            if (data) {
              const { locations } = data;
              return <HistoricRatesBody locations={locations} />;
            }
          }}
        </Query>
      </Fragment>
    );
  }
}

