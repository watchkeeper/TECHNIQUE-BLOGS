package xyz.jayrui.stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import xyz.jayrui.metrics.frame.Event;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-13
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class GetStarted {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 23, 12, 32, 87, 11,12,11);
        List<Event> events = new ArrayList<>();
        events.add(new Event(1, UUID.randomUUID()));
        events.add(new Event(212,UUID.randomUUID()));
        events.add(new Event(123,UUID.randomUUID()));

        filter(nums);
        find(nums);
        map(events);
        reduce(nums);
        collec(events);
    }

    static void filter(List<Integer> nums){

        Stream<Integer> stream = nums.stream();

        stream.filter(num-> num > 10)
                .filter(num -> num <=23)
                .sorted(Integer::compareTo)
                .distinct()
                .limit(10)
                .forEach(System.out::println);

    }
    static void find(List<Integer> nums){
        Stream<Integer> stream = nums.stream();
        Optional<Integer> any = stream.filter(num -> num > 20)
                .findFirst();
        System.out.println(any.get());
    }

    /**
     * 将对象转化为其他所需的类型
     */
    static void map(List<Event> events){
        Stream<Event> stream = events.stream();
        List<UUID> clientIds = stream.filter(event -> event.getClientId() > 10)
                .map(Event::getUuid)
                .collect(Collectors.toList());

        clientIds.forEach(System.out::println);
    }

    static void reduce(List<Integer> nums){
        Integer sum = nums.stream()
                .filter(num -> num > 0)
                .reduce(0, (a, b) -> a + b);

        System.out.println(sum);

        Integer min = nums.stream()
                .reduce(Integer.MAX_VALUE, Integer::min);

        Integer max = nums.stream()
                .reduce(Integer.MIN_VALUE, Integer::max);

        System.out.println("max="+max + ",min=" + min);

    }

    static void collec(List<Event> events){

        Stream<String> ss = Stream.of("hello","sima","daxia");
        String collect1 = ss.collect(Collectors.joining(","));
        System.out.println(collect1);//hello,sima,daxia

        Map<Integer, List<Event>> collect = events.stream()
                .collect(Collectors.groupingBy(Event::getClientId));//根据clientId进行分组

        Double avg = events.stream()
                .map(Event::getIdChar)
                .collect(Collectors.averagingInt(n -> n)); //将对应的idChar转为int类型之后再进行求均值


    }
}
