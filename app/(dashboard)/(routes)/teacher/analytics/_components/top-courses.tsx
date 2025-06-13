"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopCourse {
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
}

interface TopCoursesProps {
  data: TopCourse[];
  className?: string;
}

export const TopCourses = ({ data,className }: TopCoursesProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-medium text-blue-600">Top Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Enrollments</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">{course.enrollments}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(course.revenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};