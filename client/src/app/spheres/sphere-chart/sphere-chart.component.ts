import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { AdvancedSphereColor } from '../sphere.model';
import { NgChanges } from '../../utils/type-utils';
import { localizedColors } from '../sphere-page.service';
import { DeviceService } from '../../shared/device.service';

@Component({
  selector: 'sb-sphere-chart',
  templateUrl: './sphere-chart.component.html',
  styleUrl: './sphere-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SphereChartComponent implements OnChanges {

  @Input()
  data!: Record<AdvancedSphereColor, number>;
  private readonly isMobile: boolean;

  options!: EChartsOption;
  constructor(private deviceService: DeviceService) {
    this.isMobile = deviceService.isDeviceMobile();
  }

  ngOnChanges(changes: NgChanges<SphereChartComponent>): void {
    const val = changes.data.currentValue;
    const data = Object.entries(val).map(entry => ({
      value: entry[1],
      itemStyle: {
        color: entry[0],
        shadowColor: entry[0],
      }
    }));
    this.options = {
      title: {
        text: 'Результат',
        show: true,
      },
      tooltip: {},
      xAxis: {
        data: Object.keys(val).map(key => localizedColors[key as AdvancedSphereColor]),
        silent: false,
        splitLine: {
          show: false,
        },
        axisLabel: {
          rotate: this.isMobile ? 30 : 0,
          interval: this.isMobile ? 0 : 'auto',
          hideOverlap: false,
        },
        axisTick: {
          interval: this.isMobile ? 0 : 'auto',
        },
      },
      yAxis: {},
      series: [{
        name: 'Шары',
        type: 'bar',
        data: data
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    } satisfies EChartsOption;
  }
}
